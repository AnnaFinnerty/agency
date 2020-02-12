class Employee{
    constructor(id, name,icon, gender,age,level, title,focus,skills, skillset, stats, salary,project){
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
        this.project = project;
        this.projectId = project ? project.id : null;
        this.match = null;
        this.currentRequest = false;
        this.daysWaitedOnRequest = 0;
        this.onVaction = false;
        this.vacationDaysRemaining = 0;
    }
    update(){
        console.log('updating employee!');
        const r = Math.random();
        if(this.onVaction){
            if(this.vacationDaysRemaining <= 0){
                this.onVaction = false;
            } else {
                this.vacationDaysRemaining -= 1;
            }
        } else if(this.currentRequest){
            //the employee will always lose happiness/productivity if they have a current unfilled request
            if(this.daysWaitedOnRequest >=10 ){
                //employee gives up on request if they've wait more than 10 days
                this.currentRequest = false;
                this.daysWaitedOnRequest = 0;
            } else {
                this.stats.happiness -= this.daysWaitedOnRequest;
                this.stats.productivity -= this.daysWaitedOnRequest;
            }

        } else {
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
        }

        if(this.stats.happiness < 5){
            this.quit = true;
        }
    }
    vacation(days){
        console.log('going on vacation!');
        this.onVaction = true;
        this.vacationDaysRemaining = days;
    }
    promote(){
        this.level += 1;
        //title will be change back in content
        this.stats.happiness = this.stats.happiness + 10 >= 100 ? 100 : this.stats.happiness + 10;
        this.stats.productivity = this.stats.productivity + 1 >= 10 ? 10 : this.stats.productivity + 1;
    }
    demote(){
        this.level -= 1;
        //title will be change back in content
        this.stats.happiness = this.stats.happiness - 10 <= 0 ? 0 : this.stats.happiness - 10;
        this.stats.productivity = this.stats.productivity - 1 <= 0 ? 0 : this.stats.productivity - 1;
    }
    raiseSalary(){
        this.salary += 10000;
        //title will be change back in content
        this.stats.happiness = this.stats.happiness + 10 >= 100 ? 100 : this.stats.happiness + 10;
        this.stats.productivity = this.stats.productivity + 1 >= 10 ? 10 : this.stats.productivity + 1;
    }
    lowerSalary(){
        this.salary -= 10000;
        //title will be change back in content
        this.stats.happiness = this.stats.happiness - 10 <= 0 ? 0 : this.stats.happiness - 10;
        this.stats.productivity = this.stats.productivity - 1 <= 0 ? 0 : this.stats.productivity - 1;
    }
    makeRequest(){
        this.currentRequest = true;
    }
    requestSatisfied(){
        console.log('thanks, my request was satisified');
        this.stats.happiness = this.stats.happiness + 10 >= 100 ? 100 : this.stats.happiness + 10;
    }
    requestDenied(){
        console.log('that sucks, my request was denied');
        this.stats.happiness = this.stats.happiness - 10 <= 0 ? 0 : this.stats.happiness - 10;
    }
    satisfy(amt){
        this.stats.happiness = this.stats.happiness + amt >= 100 ? 100 : this.stats.happiness + amt;
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