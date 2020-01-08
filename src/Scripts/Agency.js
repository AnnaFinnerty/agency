class Agency{
    constructor(name,coh, maxSalary, monthlyExpenditures, monthlyProfit, yearsInOperation){
        console.log('agency running');
        this.name = name ? name : 'Web Brands';
        this.coh = coh ? coh : 100000;
        this.maxSalary = maxSalary ? maxSalary : 300000;
        this.monthlyExpenditures = monthlyExpenditures ? monthlyExpenditures : 300000;
        this.monthlyProfit = monthlyProfit ? monthlyProfit : 100000;
        this.yearsInOperation = yearsInOperation ? yearsInOperation : 1;
        //date founded
    }
}

Agency.prototype.calculateAgencyParameters = function(employees){
    let totalSalaries = 0;
    for(let i = 0; i < employees.length; i++){
        totalSalaries+=employees[i].salary;
    }
    //overhead constant
    const overhead = employees.length * this.yearsInOperation;
    const monthlySalaries = Math.floor(totalSalaries/12);
    this.monthlyExpenditures = monthlySalaries + Math.floor(overhead/12);
}

export default Agency