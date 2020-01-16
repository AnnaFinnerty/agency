class Agency{
    constructor(name,coh, maxSalary, monthlyExpenditures, monthlyProfit, yearsInOperation, startYear){
        console.log('agency running');
        this.name = name ? name : 'Web Brands';
        this.coh = coh ? coh : 100000;
        this.maxSalary = maxSalary ? maxSalary : 300000;
        this.monthlyExpenditures = monthlyExpenditures ? monthlyExpenditures : 300000;
        this.monthlyProfit = monthlyProfit ? monthlyProfit : 100000;
        this.numActiveProjects = 3;
        this.yearsInOperation = yearsInOperation ? yearsInOperation : 1;
        this.startYear = startYear ? startYear: new Date().getFullYear() - 1 ;
        this.experience = 0;
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
        let coh = this.coh + profit;
        coh = coh - this.monthlyExpenditures;
    }
}

export default Agency