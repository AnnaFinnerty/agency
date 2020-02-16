
import RandomEmployee from './RandomEmployee';

function EmployeeManager(){
    this.boss = null;
    this.employees = [];
    this.applicants = [];
    this.employeeStats = {}
    this.randomEmployee = new RandomEmployee();
    this.emit = this.emit.bind(this);
}

EmployeeManager.prototype.emit = function(action,data){
    const paths = {
        hire: this.hireApplicant.bind(this),
        fire: this.fireEmployee.bind(this),
        update: this.updateEmployee.bind(this)
    }
    if(paths[action]){
        const cb =paths[action];
        cb(data);
        return {employees:this.employees,applicants:this.applicants}
    } else {
        console.log('employee manager could not find path for ' + action)
    }
}

EmployeeManager.prototype.newEmployees = function(numEmployees,numLeader,projects){
    const startStuff = this.randomEmployee.generateStartEmployees(numEmployees,numLeader,projects)
    this.employees = startStuff['employees']
    this.boss = this.employees[0];
    this.sortEmployees();
    this.updateEmployeeStats();
    this.sortEmployeesbyProject();
    console.log('new employees')
    
    return startStuff
}

EmployeeManager.prototype.dismissApplicant = function(applicantId){
    this.applicants = this.applicants.filter((applicant)=>applicant.id !== applicantId)
}

EmployeeManager.prototype.hireApplicant = function(applicantId){
    console.log('hiring applicant')
    const applicant = this.applicants.find((applicant)=>applicant.id === applicantId);
    applicant.id = this.randomEmployee.generateEmployeeID();
    this.applicants = this.applicants.filter((applicant)=>applicant.id !== applicantId)
    this.employees.push(applicant);
    this.sortEmployees();
}

EmployeeManager.prototype.updateEmployee = function(employee){
    this.employees = this.employees.filter((e)=>employee.id !== e.id ? e : employee)
    this.sortEmployees();
    this.updateEmployeeStats();
}

EmployeeManager.prototype.fireEmployee = function(employeeId){
    this.employees = this.employees.filter((employee)=>employee.id !== employeeId)
    this.sortEmployees();
    this.updateEmployeeStats();
}

EmployeeManager.prototype.updateEmployeeStats = function(){
    console.log('updating employee stats')
    const employeeStats = {
        productivity: 0,
        happiness: 0,
        salary: 0
    }
    for(let i = 0; i < this.employees.length; i++){ 
        const employee = this.employees[i];
        employeeStats.productivity += employee.stats.productivity;
        employeeStats.happiness += employee.stats.happiness;
        employeeStats.salary += employee.salary;
    }
    for(let i in employeeStats){
        employeeStats[i] = Math.floor(employeeStats[i]/(this.employees.length))
    }
    this.employeeStats = employeeStats
}

EmployeeManager.prototype.sortEmployeesbyProject = function(){
    const employeesByProject = {}
    for(let i = 0; i < this.employees.length; i++){
        const employee = this.employees[i];      
        if(employee.projectId){
            if(!employeesByProject[employee.projectId]){
              employeesByProject[employee.projectId] = []
            }
            employeesByProject[employee.projectId].push(employee)
        }
    }
    this.employeesByProject = employeesByProject;
}

EmployeeManager.prototype.getEmployeesByProject = function(projectId){
    return this.employeesByProject[projectId]
}

EmployeeManager.prototype.sortEmployees = function(){
    this.employees.sort(function(a,b){return b.level - a.level})
}

export default EmployeeManager