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
        this.cohHistory = [];
        this.settings = {
            acceptingApplicants: true,
            acceptingProjects: true,
            acceptingOneTimePayments: false,
        }
        //date founded
    }
    debit = (amt) => {
        this.coh -= amt;
    }
    calculateAgencyParameters = function(employees,projects){
        console.log('updating agency info');
        let totalSalaries = 0;
        let totalIncome = 0;
        for(let i = 0; i < employees.length; i++){
            totalSalaries+=employees[i].salary;
        }
        for(let i = 0; i < projects.length; i++){
            if(projects[i].accepted){
                const monthlyPayment = projects[i].calculatePayment();
                totalIncome+= monthlyPayment;
            }
        }
        //increase overhead based on age of agency/number of employees
        const overhead = employees.length * this.yearsInOperation;
        const monthlySalaries = Math.floor(totalSalaries/12);
        this.monthlyExpenditures = monthlySalaries + Math.floor(overhead/12);
        this.monthlyProfit = totalIncome;
    }
    monthlyUpdate(projects){
        console.log('end of month!')
        let profit = 0;
        for(let i = 0; i < projects.length; i++){
            profit += projects[i].calculatePayment();
        }
        if(!projects){
            //if there's no projects, this is an AI agency, which will use update randomly
            this.autoUpdate();
        } else {
            //if there's a profit, this agency belongs to a player.
            this.coh = this.coh + profit - this.monthlyExpenditures;
        }
        return projects
    }
    autoUpdate(){

    }
    completeProject(project){
        this.completedProjects += 1;
        
    }
}

export default Agency