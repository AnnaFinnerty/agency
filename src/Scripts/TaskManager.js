function TaskManager(){
    console.log('task manager running');
    this.tasks = [];
}

TaskManager.prototype.addTask = function(task){
    console.log('adding task')
    this.tasks.push(task);
    return this.tasks
}

TaskManager.prototype.createTask = function(text,urgency,action,requester,type,target){
    const task = {
      text: text,
      urgency: urgency,
      requester: requester ? requester : "",
      type: type,
      target: target,
      action: action
    };
    this.addTask(task)
  }

TaskManager.prototype.removeTask = function(i){
    console.log('removing task');
    if(i){
        this.tasks.splice(i,1);
    }
    return this.tasks
}

export default TaskManager