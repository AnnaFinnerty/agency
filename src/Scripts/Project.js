class Project{
    constructor(id, company, name, sector,type, requirements,budget, estimatedMonthsToCompletion,monthsActive,percentComplete){
        this.id = id;
        this.company = company;
        this.name = name;
        this.sector = sector;
        this.type = type;
        this.requirements = requirements;
        this.budget = budget;
        this.totalPaid = 0;
        this.payInInstallments = true;
        this.estimatedMonthsToCompletion = estimatedMonthsToCompletion;
        this.monthsToCompletion = estimatedMonthsToCompletion;
        this.monthsActive = monthsActive ? monthsActive : 0;
        this.percentComplete = percentComplete ? percentComplete : 0;    
    }
    update(productivity){
        let payment = 0;
        if(this.monthsToCompletion >= this.estimatedMonthsToCompletion || this.percentComplete === 100){
            if(this.percentComplete === 100){
                console.log('project complete')
                if(this.payInInstallments){
                    payment = this.budget/this.estimatedMonthsToCompletion
                } else {
                    payment = this.budget
                }
            } else {
                console.log("you're still not done!?!?!");
                this.percentComplete = this.percentComplete + productivity * 100;
            }
        } else {
            if(this.payInInstallments){
                payment = this.budget/this.estimatedMonthsToCompletion
            }
        }
        return payment
    }
    printInfo(){
        console.log("project info");
        console.log(this.company);
        console.log(this.name);
        console.log('sector',this.sector);
        console.log('type',this.type);
        console.log('requirements',this.requirements);
        console.log('budget',this.budget);
        console.log('estimatedMonthsToCompletion',this.estimatedMonthsToCompletion);
    }
}

export default Project