function MatchEmployeeToProject(employee,project){
    let matchScore = 0;
    const employeeSkills = Object.keys(employee.skillset);
    for(let i = 0; i < employeeSkills.length; i++){
        if(project.requirements.required.includes(employeeSkills[i])){
            matchScore+=1;
        }
        if(project.requirements.optional.includes(employeeSkills[i])){
            matchScore+=.5;
        }
    }
    return matchScore
}

export default MatchEmployeeToProject