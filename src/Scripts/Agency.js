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
        this.completedProjects = 0;
        //date founded
    }
    calculateAgencyParameters = function(employees,projects){
        let totalSalaries = 0;
        let totalIncome = 0;
        for(let i = 0; i < employees.length; i++){
            totalSalaries+=employees[i].salary;
        }
        for(let i = 0; i < projects.length; i++){
            const budget = projects[i].budget;
            const monthes = projects[i].estimatedMonthsToCompletion;
            totalIncome=totalIncome + Math.floor(budget/monthes);
        }
        //increase overhead based on age of agency/number of employees
        const overhead = employees.length * this.yearsInOperation;
        const monthlySalaries = Math.floor(totalSalaries/12);
        this.monthlyExpenditures = monthlySalaries + Math.floor(overhead/12);
        this.monthlyProfit = Math.floor(totalIncome);
    }
    update(profit){
        if(!profit){
            //if there's no profit, this is an AI agency, which will use update randomly
            this.autoUpdate();
        } else {
            //if there's a profit, this agency belongs to a player.
            this.coh = this.coh + profit - this.monthlyExpenditures;
        }
    }
    autoUpdate(){

    }
    completeProject(project){
        this.completedProjects += 1;
        
    }
}

export default Agency