import Employee from './Employee';
import MatchEmployeeToProject from './MatchEmployeeToProject';

function RandomEmployee(){
    this.employeeId = 100000001;
    this.maxLeaders = 2;
    this.currentLeaders = 0;
    this.usedNames = [];
    this.femaleIcons = ['female-icon-1'];
    this.maleIcons = ['male-icon-1'];
    this.neutralIcons = ['male-icon-1'];
}

RandomEmployee.prototype.generateStartEmployees = function(numEmployees, numLeaders, startProjects){
    console.log('generating start employees');
    console.log(startProjects);
    //remove projects that aren't accepted from start projects
    startProjects = startProjects.filter((project)=> project.accepted)
    const employeeStats = {
                            productivity: 0,
                            happiness: 0,
                            salary: 0,
                          }
    const startEmployees = [];
    //generate random leader and add their stats to initial employee stats
    for(let i = 0; i < numLeaders; i++){ 
        const employee = this.generateRandomEmployee(false,null,5);
        employeeStats.productivity += employee.stats.productivity;
        employeeStats.happiness += employee.stats.happiness;
        employeeStats.salary += employee.salary;
        startEmployees.push(employee);
    }
    //generate start employees
    for(let i = 0; i < numEmployees; i++){
        //choose project at random from start projects
        //MTC this can be better -- use modulus to equally divide employees into projects
        const project = this.randomFromArray(startProjects);
        //generate new employee using that project and add their stats to initial employee stats
        const employee = this.generateRandomEmployee(false,project);
        employeeStats.productivity += employee.stats.productivity;
        employeeStats.happiness += employee.stats.happiness;
        employeeStats.salary += employee.salary;
        const match = MatchEmployeeToProject(employee,project);
        employee.match = match;
        //add employee to project's workers array
        project.workers.push(employee);
        project.calculateProductivity();
        //add to employee array
        startEmployees.push(employee);
    }
    //average intial employee stats
    for(let i in employeeStats){
        employeeStats[i] = Math.floor(employeeStats[i]/(numEmployees))
    }
    return {
        employees: startEmployees,
        employeeStats: employeeStats,
        startProjects: startProjects
    }
}

RandomEmployee.prototype.generateEmployeeID = function(){
    const id = this.employeeId;
    this.employeeId += 1;
    return id
}

RandomEmployee.prototype.generateRandomEmployee = function(applicant, project, positionLevel){
    // console.log("generating random employee");
    //generate ids for start employees only. Employees usually recieve id on hire.
    const id = !applicant ? this.generateEmployeeID() : null;
    //set random employee properties
    const gender = this.randomGender();
    const icon = gender === "male" ? this.randomFromArray(this.maleIcons) : gender === "female" ? this.randomFromArray(this.femaleIcons) : this.randomFromArray(this.neutralIcons);
    const name = this.randomName(gender);
    const age = this.randomBetweenInts(23,60);
    // this can be cleaned up now that the leaders are created seperately
    const maxLevel = this.currentLeaders >= 2 ? 4 : 5;
    const level = positionLevel ? positionLevel : this.randomBetweenInts(1,maxLevel);
    if(level === 3){
        this.currentLeaders+=1;
    }
    //check employees' skills against project requirements

    //generate random employee properties baded on level
    const skillset = this.randomSkillset(level);
    const stats = this.randomStats();
    const salary = this.randomBetweenInts(4,4+(level*2)) * 10000;
    //create and return new employee
    const employee = new Employee(id,name,icon,gender,age,level,skillset.title,skillset.focus,skillset.skills, skillset.skillSet,stats, salary,project);
    return employee
}

RandomEmployee.prototype.randomSkillset = function(level){
    //skill areas and job title
    const skillsets = {
        ux: ['graphic designer','ux designer','ui designer'],
        frontend: ['jr frontend dev','frontend dev','sr frontend dev'],
        backend: ['jr backend dev','backend dev','sr backend dev'],
        datascience: ['jr data analyst','data analyst','sr data analyst'],
        management: ['cfo','cto','ceo']
    }
    //give all players two focuses. Only the first will be visible to the player.
    const focii = Object.keys(skillsets);
    // const fociiWithoutManagerial = focii.pop();
    //All leaders aka level 5 employees focus on management.
    const focusOne = level === 5 ? 'management' : this.randomFromArray(focii);
    const focusTwo = this.randomFromArray(focii);
    //select a bunch of random skills from those two focuses
    const skillsSelection = this.randomSkills(focusOne,focusTwo);
    const skills = [];
    const skillSet = {};
    for(let i = 0; i < skillsSelection.length; i++){
        //put the first three items into a skills array, which will be the only skills visible to the player
        if(i<=2){
            skills.push(skillsSelection[i]);
        }
        //add all skills to the skillset and give them a random starting value, limited by the employees level
        skillSet[skillsSelection[i]] = this.randomBetweenInts(0,5+level);
    }
    //get the employees title based on focus/level
    const title = level === 5 ? this.randomFromArray(skillsets[focusOne]) : skillsets[focusOne][level-1];
    return {
        focus: focusOne,
        skills: skills,
        skillSet: skillSet,
        title: title
    }
}

RandomEmployee.prototype.randomSkills = function(focusOne,focusTwo){
    const skills = {
        ux: ['design','css','wireframing'],
        frontend: ['css','html', 'jQuery','javascript'],
        backend: ['javascript','express','python','sql'],
        datascience: ['python','matplotlib','tensorflow'],
        management: ['agile','kanban','motivation'],
    }
    let skillset = [];
    if(focusOne !== focusTwo){
        skillset.push(skills[focusOne][0])
        skillset.push(skills[focusOne][1])
        skillset.push(skills[focusOne][2])
        skillset.push(skills[focusTwo][0])
    } else {
        skillset = skills[focusOne]
    }
    return skillset
}

RandomEmployee.prototype.randomStats = function(){
    const stats = {
        productivity: this.randomBetweenInts(1,101),
        happiness: this.randomBetweenInts(1,101),
        creativity: this.randomBetweenInts(1,101),
        accuracy: this.randomBetweenInts(1,101),
        curiosity: this.randomBetweenInts(1,101),
        dedication: this.randomBetweenInts(1,101),
    }
    return stats
}

RandomEmployee.prototype.randomGender = function(){
    const genders = ['male', 'female', 'neutral'];
    const gender = this.randomFromArray(genders);
    return gender
}

RandomEmployee.prototype.randomName = function(gender){
    const first_name_male = ['Scott','Trevor','Sanjay','John','Julio','Adam','Bill','Dave','Deangelo','Eric'];
    const first_name_female = ['Jill','Nancy','Maria','Ann','Sara','Julia','Bella','Simone','Angela','Kendra','Erica'];
    const last_names = ['Jones','Paul','Smith','Johnson','Gupta','Sanchez','Saul','Lopez','Gupta','Wang','Devi','Liu','Chen','Khan','Ali','Johannes','Nguyen','Kim','Sato'];
    let first_name;
    if(gender === "male"){
        first_name = this.randomFromArray(first_name_male);
    } else if (gender === "female"){
        first_name = this.randomFromArray(first_name_female);
    } else {
        const combine = first_name_male.concat(first_name_female);
        first_name = this.randomFromArray(combine);
    }
    const lastName = this.randomFromArray(last_names);
    return {
            first:first_name, 
            last: lastName, 
            full:first_name + " " + lastName,
            display: first_name.charAt(0) + ". " + lastName,
            short: first_name + " " + lastName.charAt(0) + ".",
            email: first_name.charAt(0) + lastName + '@'
        }
}

RandomEmployee.prototype.randomFromArray = function(arr){
    return arr[Math.floor(Math.random()*arr.length)]
}

RandomEmployee.prototype.randomBetweenInts = function(start,end){
    return Math.floor(Math.random()*(end-start)) + start
}

export default RandomEmployee