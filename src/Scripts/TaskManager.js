function TaskManager(){
    console.log('task manager running');
    this.tasks = [];
}

TaskManager.prototype.addTask = function(task){
    console.log('adding task')
    this.tasks.push(task);
    return this.tasks
}  

TaskManager.prototype.removeTask = function(i){
    console.log('removing task');
    this.tasks.splice(i,1);
    return this.tasks
}

export default TaskManager