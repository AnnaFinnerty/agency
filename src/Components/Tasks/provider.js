import React, {Component} from 'react';

import TasksContext from './context';
import Tasks from './index';

class TasksProvider extends Component {
  constructor(props){
      super();
      this.state = {
          tasks: ['hey its a test task'],
      }
      this.addTask = (newTask) => {
        this.setState(state => ({
          tasks: [newTask, ...this.state.tasks]
        }));
      };
      this.removeTask = (removeTask) => {
          this.setState({
              tasks:this.state.tasks.filter((task)=> task !== removeTask)
          })
      }
  }
  render(){    
    return (
        <TasksContext.Provider value={{tasks:this.state.tasks,addTask:this.addTask,removeTask:this.removeTask}}>
            <Tasks />
        </TasksContext.Provider>
      );
  }
}

export default TasksProvider;