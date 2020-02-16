
import RandomEmployee from './RandomEmployee';

function EmployeeManager(){
    this.employees = [];
    this.applicants = [];
    this.randomEmployee = new RandomEmployee();
}

EmployeeManager.prototype.emit = function(action,data){
    const paths = {
        hire: this.hireEmployee(data),
        fire: this.fireEmployee(data),
    }
    if(paths[action]){
        const cb =paths[action];
        const result = cb(data);
        return result
    } else {
        console.log('employee manager could not find path for ' + action)
    }
}

EmployeeManager.prototype.hireEmployee = function(employeeId){

    return this.employees
}

EmployeeManager.prototype.fireEmployee = function(employeeId){

    return this.employees
}

export default EmployeeManager