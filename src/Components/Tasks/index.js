import React, {Component} from 'react';

import '../../App.css';
import { Header, Form, Input, Button, Icon } from 'semantic-ui-react'

class Tasks extends Component {
  constructor(props){
      super();
      this.state = {
          newTaskInput: '',
      }
      this.urgencyColors = ['dimgray','black','yellow','orange','firebrick']
  }
  onSubmit = (e) => {
    this.props.addTask(this.state.newTaskInput)
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
            <div key={i} className='task'>
                 <Button style={{padding:'3px',borderRadius:'100%'}}>
                    <Icon style={{margin:'0',color:this.urgencyColors[task.urgency]}} name='circle'></Icon>
                 </Button>
                <span>{task.text}</span>
                <Button onClick={()=>this.props.dismissTask(i)} style={{padding:'3px',borderRadius:'100%'}}>
                    <Icon style={{margin:'0'}} name='remove'></Icon>
                </Button>
            </div>
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