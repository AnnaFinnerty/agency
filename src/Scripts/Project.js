class Project{
    constructor(id, company, name, sector,type, requirements,budget, estimatedMonthsToCompletion,monthsActive,percentComplete){
        this.id = id;
        this.comnpany = company;
        this.name = name;
        this.sector = sector;
        this.type = type;
        this.requirements = requirements;
        this.budget = budget;
        this.estimatedMonthsToCompletion = estimatedMonthsToCompletion;
        this.monthsActive = monthsActive ? monthsActive : 0;
        this.percentComplete = percentComplete ? percentComplete : 0;
        
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