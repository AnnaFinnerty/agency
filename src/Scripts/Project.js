
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
        this.payment = 0;
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
    addWorker(worker){
        this.workers.push(worker);
        this.calculateProductivity();
    }
    removeWorker(worker){
        this.workers.filter((w) => worker.id !== w.id)
        this.calculateProductivity();
    }
    calculateProductivity(workers){
        console.log('calcluating prod:')
        console.log(workers);
        let productivity = 0;
        if(workers && workers.length){
            for(let i = 0; i < workers.length; i++){
                productivity += (workers[i].stats.productivity * workers[i].match);
                }
            productivity = Math.floor(productivity/this.workers.length);
        }
        this.percentComplete = this.percentComplete + productivity/30;
        this.productivity = productivity;
        const onTime = (this.estimatedMonthsToCompletion*productivity)/this.estimatedMonthsToCompletion;
        console.log('on time calc',onTime);
        this.onTime = onTime;
    }
    calculatePayment(){
        this.monthsActive += 1;
        this.payment = 0;
        if(this.monthsActive >= this.estimatedMonthsToCompletion || this.percentComplete >= 100){
            if(this.percentComplete === 100){
                console.log('project complete')
                this.complete = true;
                if(this.payInInstallments){
                    this.payment = Math.floor(this.budget/this.estimatedMonthsToCompletion)
                } else {
                    this.payment = this.budget;
                }
            } else {
                console.log("you're still not done!?!?!");
                this.satisfaction -= 10;
            }
        } else {
            if(this.payInInstallments){
                console.log('paying in installments!')
                this.payment = Math.floor(this.budget/this.estimatedMonthsToCompletion);
                this.satisfaction += 1;
            }
        }
        return this.payment
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