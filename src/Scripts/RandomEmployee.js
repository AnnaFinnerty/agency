import Employee from './Employee';
function RandomEmployee(){
    this.employeeId = 100000001;
    this.maxLeaders = 2;
    this.currentLeaders = 0;
    this.usedNames = [];
}

RandomEmployee.prototype.generateStartEmployees = function(numEmployees, numLeaders, startProjects){
    const startEmployees = [];
    
    return startEmployees
}

RandomEmployee.prototype.generateEmployeeID = function(){
    const id = this.employeeId;
    this.employeeId += 1;
    return id
}

RandomEmployee.prototype.generateRandomEmployee = function(applicant){
    // console.log("generating random employee");
    const id = !applicant ? this.generateEmployeeID() : null;
    const gender = this.randomGender();
    const name = this.randomName(gender);
    const age = this.randomBetweenInts(23,60);
    const maxLevel = this.currentLeaders >= 2 ? 4 : 6;
    const level = this.randomBetweenInts(1,maxLevel);
    if(level === 3){
        this.currentLeaders+=1;
    }
    const skillset = this.randomSkillset(null, level);
    const stats = this.randomStats();
    const salary = this.randomBetweenInts(5,13) * 10000;
    const employee = new Employee(id,name,gender,age,level,skillset,stats, salary);
    // console.log(employee);
    //employee.printInfo();
    return employee
}

RandomEmployee.prototype.randomSkillset = function(focusOne,level){
    const focii = ['ux', 'frontend','backend', 'datascience','management']
    focusOne = focusOne ? focusOne : this.randomFromArray(focii);
    const focusTwo = level === 3 ? 'management' : this.randomFromArray(focii);
    const skills = this.randomSkills(focusOne,focusTwo);
    return {
        focus: focusOne,
        skills: skills
    }
}

RandomEmployee.prototype.randomSkills = function(focusOne,focusTwo){
    const skills = {
        ux: ['design','css'],
        frontend: ['css','html','javascript'],
        backend: ['python','javascript'],
        datascience: ['python','matplotlib','tensorflow'],
        management: ['agile','kanban'],
    }
    let skillset = [];
    if(focusOne !== focusTwo){
        skillset.push(skills[focusOne][0])
        skillset.push(skills[focusOne][1])
        skillset.push(skills[focusTwo][0])
    } else {
        skillset = skills[focusOne]
    }
    return skillset
}

RandomEmployee.prototype.randomStats = function(){
    const stats = {
        productivity: this.randomBetweenInts(1,11),
        happiness: this.randomBetweenInts(1,101),
        creativity: this.randomBetweenInts(1,11),
        curiosity: this.randomBetweenInts(1,11),
        dedication: this.randomBetweenInts(1,11),
    }
    return stats
}

RandomEmployee.prototype.randomGender = function(){
    const genders = ['male', 'female', 'neutral'];
    const gender = this.randomFromArray(genders);
    return gender
}

RandomEmployee.prototype.randomName = function(gender){
    const first_name_male = ['Scott','Trevor','Sanjay'];
    const first_name_female = ['Jill','Nancy','Maria'];
    const last_names = ['Jones','Paul','Smith','Johnson','Gupta'];
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
            short: first_name + " " + lastName.charAt(0) + "."
        }
}

RandomEmployee.prototype.randomFromArray = function(arr){
    return arr[Math.floor(Math.random()*arr.length)]
}

RandomEmployee.prototype.randomBetweenInts = function(start,end){
    return Math.floor(Math.random()*(end-start)) + start
}

export default RandomEmployee