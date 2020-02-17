function ProjectManager(){
    this.projects = [];
    this.emit = this.emit.bind(this);
    this.addProject = this.addProject.bind(this);
}

ProjectManager.prototype.emit = function(action,data){
    console.log('project emit '+action)
    const paths = {
        add: this.addProject.bind(this),
        consider: this.considerProject.bind(this),
        accept: this.acceptProject.bind(this),
        reject: this.rejectProject.bind(this),
        withdraw: this.withdrawFromProject.bind(this)
    }
    if(paths[action]){
        const cb =paths[action];
        cb(data);
        return this.projects 
    } else {
        console.log('project manager could not find path for ' + action)
    }
}

ProjectManager.prototype.addProject = function(project){
    this.projects.unshift(project);
}

ProjectManager.prototype.considerProject = function(project){
    console.log('rejecting project')
    project.considering = true;
    this.projects.map((p)=> p.id !== project.id ? p : project)
}

ProjectManager.prototype.acceptProject = function(project){
    console.log('accepting project')
    project.accepted = true;
    this.projects.map((p)=> p.id !== project.id ? p : project)
}

ProjectManager.prototype.rejectProject = function(project){
    console.log('rejecting project')
    this.projects = this.projects.filter((p) => p.id !== project.id)
}

ProjectManager.prototype.withdrawFromProject = function(project){
    this.projects = this.projects.filter((p) => p.id !== project.id)
}

ProjectManager.prototype.updateProjects = function(employeesByProject){
    console.log('updating projects');
    console.log(employeesByProject);
    const completedProjects = [];
    const failedProjects = [];
    for(let i = 0; i < this.projects.length; i++){
        this.projects[i].calculateProductivity(employeesByProject[this.projects[i].id]);
        if(this.projects[i].completed){
            completedProjects.push(this.projects[i])
            this.projects.withdrawFromProject(this.projects[i]);
        }
    }
    return {
        completed: completedProjects,
        failed: failedProjects
    }
}

ProjectManager.prototype.updateProjectProductity = function(employeesByProject){
    console.log(employeesByProject)
    for(let i = 0; i < this.projects.length; i++){
        this.projects[i].calculateProductivity(employeesByProject[this.projects[i].id]);
    }
}

export default ProjectManager