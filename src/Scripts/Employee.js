class Employee{
    constructor(id, name,icon, gender,age,level, title,focus,skills, skillset, stats, salary,projectId){
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.gender = gender;
        this.age = age;
        this.level = level;
        this.title = title;
        this.focus = focus;
        this.skills = skills;
        this.skillset = skillset;
        this.stats = stats;
        this.salary = salary;
        this.quit = false;
        this.projectId = projectId;
        this.problems = 0;
        this.matched = false;
    }
    update(){
        console.log('updating employee!');
        const r = Math.random();
        if(r < .1){
            this.stats.happiness -= 1;
        } else if (r > .9){
            this.stats.happiness += 1;
        }
        const r2 = Math.random();
        if(r2 < .1){
            this.stats.productivity -= 1;
        } else if (r > .9){
            this.stats.productivity += 1;
        }
        if(this.stats.happiness < 5 || this.problems > 5){
            this.quit = true;
        }
    }
    updateSkills(projectSkills){

    }
    printInfo(){
        console.log("employee info");
        console.log(this.name);
        console.log('gender:',this.gender);
        console.log('age:',this.age);
        console.log('level:',this.level);
        console.log('job', this.job);
        console.log('stats:', this.stats)
        console.log('salary', "$"+ this.salary);
    }
}

export default Employee