
class Project{
    constructor(id, company, name, shortName, sector,type, accepted, requirements,budget, estimatedMonthsToCompletion,monthsActive,percentComplete){
        this.id = id;
        this.company = company;
        this.name = name;
        this.shortName = shortName;
        this.sector = sector;
        this.type = type;
        this.accepted = accepted;
        this.considering = accepted;
        this.requirements = requirements;
        this.budget = budget;
        this.totalPaid = 0;
        this.payInInstallments = true;
        this.estimatedMonthsToCompletion = estimatedMonthsToCompletion;
        this.monthsToCompletion = estimatedMonthsToCompletion;
        this.monthsActive = monthsActive ? monthsActive : 0;
        this.percentComplete = percentComplete ? percentComplete : 0;
        this.onTime = true;
        this.workers = [];
        this.productivity = 0;
        this.complete = false;
        this.satisfaction = 100-(this.estimatedMonthsToCompletion-this.monthsActive);    
    }
    update(){
        console.log('updating project!');
        let payment = 0;
        console.log('monthes active',this.monthsActive);
        this.monthsActive += 1;
        this.calculateProductivity();
        console.log(this.percentComplete);
        if(this.monthsActive >= this.estimatedMonthsToCompletion || this.percentComplete === 100){
            if(this.percentComplete === 100){
                console.log('project complete')
                this.complete = true;
                if(this.payInInstallments){
                    payment = Math.floor(this.budget/this.estimatedMonthsToCompletion)
                } else {
                    payment = this.budget;
                }
            } else {
                console.log("you're still not done!?!?!");
                this.satisfaction -= 10;
            }
        } else {
            if(this.payInInstallments){
                console.log('paying in installments!')
                payment = Math.floor(this.budget/this.estimatedMonthsToCompletion);
                this.satisfaction += 1;
            }
        }
        return payment
    }
    addWorker(worker){
        this.workers.push(worker);
        this.calculateProductivity();
    }
    removeWorker(worker){
        this.workers.filter((w) => worker.id !== w.id)
        this.calculateProductivity();
    }
    calculateProductivity(){
        let productivity = 0;
        for(let i = 0; i < this.workers.length; i++){
            productivity += this.workers[i].stats.productivity/10 * this.workers[i].match ;
            }
        productivity = Math.floor(productivity/this.workers.length);
        this.percentComplete = this.percentComplete + productivity;
        this.productivity = productivity;
        const onTime = (this.estimatedMonthsToCompletion-this.monthsActive)/productivity;
        console.log('on time calc',onTime);
        this.onTime = onTime;
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