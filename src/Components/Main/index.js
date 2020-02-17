import React, {Component} from 'react';

import Email from '../Email';
import Tasks from '../Tasks';
import Employee from '../Employee/view.js';
import Project from '../Project/view.js';

import { Menu, Tab, Icon } from 'semantic-ui-react'
import '../../App.css';

class Main extends Component {
  getPane = (type,info) => {
    switch(type){

      case 'project':
        return <Project 
                  {...info} 
                  addPane={this.props.addPane} 
                  acceptProject={this.props.acceptProject} 
                  rejectProject={this.props.rejectProject} 
                  withdrawProject={this.props.withdrawProject} 
                  updateEmployee={this.props.updateEmployee}
                  employees={this.props.employees}
                  projects={this.props.projects}
                  updateCollection={this.props.updateCollection}
                  />

      case 'applicant':
        return <Employee 
                  {...info} 
                  hireApplicant={this.props.hireApplicant} 
                  addPane={this.props.addPane}
                  updateCollection={this.props.updateCollection}
                />

      case 'employee':
        return <Employee 
                  {...info} 
                  updateEmployee={this.props.updateEmployee} 
                  updateEmployeeLevel={this.props.updateEmployeeLevel} 
                  fireEmployee={this.props.fireEmployee} 
                  addPane={this.props.addPane} 
                  projects={this.props.projects}
                  updateCollection={this.props.updateCollection}
                />

      case "email":
        return <Email 
                  emails={this.props.emails} 
                  addPane={this.props.addPane} 
                  readEmail={this.props.readEmail}
                  archiveEmail={this.props.archiveEmail}
                  considerProject={this.props.considerProject}
                  acceptProject={this.props.acceptProject}
                  hireApplicant={this.props.hireApplicant}
                  dismissApplicant={this.props.dismissApplicant}
                  resolveTask={this.props.resolveTask}
                  dismissTask={this.props.dismissTask}
                  generateTask={this.props.generateTask}
                  sendEmail={this.props.sendEmail}
                  updateCollection={this.props.updateCollection}
                  />

      case "tasks":
        return <Tasks 
                  tasks={this.props.tasks} 
                  addPane={this.props.addPane} 
                  resolveTask={this.props.resolveTask}
                  dismissTask={this.props.dismissTask}
                  generateTask={this.props.generateTask}
                  updateCollection={this.props.updateCollection}
                />
                  

      default:
        return null
    }
  }
  getPaneName = (info) => {
    switch(info.type){

      case "applicant":
        return info.info.name.display

      case "employee":
        return info.info.name.display

      case "project":
        return info.info.name

      case "email":
        return 'email (' + this.props.emails.length + ')'

      case "tasks":
        return 'tasks (' + this.props.tasks.length + ')'
       
      default:
        return info.type
    }
  }
  buildPane = (info,i) => {
    // console.log('building pane',info)
    const pane = this.getPane(info.type,info)
    const paneName = this.getPaneName(info)
    const item = { 
      menuItem: (
        <Menu.Item key={info.type + "-" + info.id} 
                   onClick={()=>this.props.updatePane(i)}
                   draggable="true"
                   onDragStart={(e)=>this.drag(e,i)}
                   onDragOver={this.allowDrop}
                   onDrop={this.drop}
                   data-i={i}
                  >
          {
            info.pinned ? <Icon name="map pin"></Icon> : ''
          }
          {paneName}
          {
            info.pinned ? '' : 
            <button onClick={()=>this.props.removePane(i)}>X</button>
          }
        </Menu.Item>
      ),
      pinned: info.pinned, 
      render: () => <Tab.Pane fluid="true">
                      {pane}
                    </Tab.Pane>
    }
    return item
  }
  allowDrop = (e) => {
    e.preventDefault();
  }
  
  drag = (e,i) => {
    console.log('drag!')
    e.dataTransfer.setData("text", i);
  }
  
  drop = (e) => {
    console.log('drop!')
    e.preventDefault();
    const previousPosition = e.dataTransfer.getData("text");
    console.log(previousPosition);
    const newPosition = e.target.getAttribute('data-i');
    console.log(newPosition);
    this.props.movePane(previousPosition,newPosition)

  }
  render(){
    // console.log('main props', this.props)
    const panes = [];
    for(let i = 0; i < this.props.panes.length; i++){
      const pane = this.buildPane(this.props.panes[i],i);
      panes.push(pane);
    }
    return (
        <Tab style={{width:'100%',height:'90vh',backgroundColor:'whitesmoke',overflowX:'scroll'}} panes={panes} activeIndex={this.props.activePane}/>
    );
  }
}

export default Main;
