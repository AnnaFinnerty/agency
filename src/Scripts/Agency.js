class Agency{
    constructor(name,coh, maxSalary, monthlyExpenditures, monthlyProfit, yearsInOperation, startYear, reputation, experience){
        console.log('agency running');
        this.name = name ? name : 'Web Brands';
        this.coh = coh ? coh : 100000;
        this.maxSalary = maxSalary ? maxSalary : 300000;
        this.monthlyExpenditures = monthlyExpenditures ? monthlyExpenditures : 300000;
        this.monthlyProfit = monthlyProfit ? monthlyProfit : 100000;
        this.numActiveProjects = 3;
        this.yearsInOperation = yearsInOperation ? yearsInOperation : 1;
        this.startYear = startYear ? startYear: new Date().getFullYear() - 1 ;
        this.reputation = reputation ? reputation : 50;
        this.experience = experience ? experience : 0;
        //date founded
    }
    calculateAgencyParameters = function(employees,projects){
        let totalSalaries = 0;
        let totalIncome = 0;
        for(let i = 0; i < employees.length; i++){
            totalSalaries+=employees[i].salary;
        }
        for(let i = 0; i < projects.length; i++){
            totalSalaries+=projects[i].salary;
        }
        //overhead constant
        const overhead = employees.length * this.yearsInOperation;
        const monthlySalaries = Math.floor(totalSalaries/12);
        this.monthlyExpenditures = monthlySalaries + Math.floor(overhead/12);
    }
    profit(amt){
        this.coh += amt
    }
    update(profit){
        if(!profit){
            //if there's no profit, this is an AI agency, which will use update randomly
            this.autoUpdate();
        } else {
            //if there's a profit, this agency belongs to a player.
            let coh = this.coh + profit;
            coh = coh - this.monthlyExpenditures;
        }
    }
    autoUpdate(){

    }
}

export default Agency