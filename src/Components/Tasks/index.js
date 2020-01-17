import React, {Component} from 'react';

import '../../App.css';
import { Header, Form, Input, Button, Icon } from 'semantic-ui-react'

class Tasks extends Component {
  constructor(props){
      super();
      this.state = {
          newTaskInput: '',
      }
  }
  onSubmit = (e) => {
    this.props.addTask(this.state.newTaskInput)
  }
  removeTask = (removeTask) => {
    this.props.removeTask(removeTask)
  }
  onChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }
  render(){
    console.log('tasks props', this.props);
    const tasks = this.props.tasks.map((task, i) => {
        return(
            <li key={i} className='task'>
                {/* <button onClick={()=>this.removeTask(task)}>o</button> */}
                 <Button onClick={()=>this.props.resolveTask(i)}>
                  <Icon name='circle'></Icon>
                 </Button>
                 {task}
                <button onClick={()=>this.removeTask(task)}>x</button>
            </li>
        )
    })
    return (
        <div>
            <Header>Tasks</Header>
            <Form>
                <Input name='newTaskInput' value={this.state.newTaskInput} onChange={(e)=>this.onChange(e)} ></Input>
                <Button onClick={this.onSubmit}>Submit</Button>
            </Form>
            <ul>
                {tasks}
            </ul>
        </div>
      );
  }
}

export default Tasks;