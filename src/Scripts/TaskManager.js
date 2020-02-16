function TaskManager(){
    console.log('task manager running');
    this.tasks = [];
}

TaskManager.prototype.emit = function(action,data){
    console.log('tasks emit '+action)
    const paths = {
        add: this.addTask.bind(this),
        create: this.createTask.bind(this),
        remove: this.removeTask.bind(this),
        
    }
    if(paths[action]){
        const cb =paths[action];
        cb(data);
        return this.tasks 
    } else {
        console.log('task manager could not find path for ' + action)
    }
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

TaskManager.prototype.dimissTask = function(i){
    console.log('dismissing task');
    if(i){
        this.tasks.splice(i,1);
    }
    return this.tasks
}

TaskManager.prototype.resolveTask = function(i){
    console.log('resolving task');
    if(i){
        this.tasks.splice(i,1);
    }
    return this.tasks
}

TaskManager.prototype.checkTaskResolution = function(array,taskType,targetId){
    for(let i = 0; i < array.length; i++){
      if(array[i].type === taskType){
        console.log('task found')
      }
    }
}

export default TaskManager