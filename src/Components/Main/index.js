import React, {Component} from 'react';

import Email from '../Email';
import Tasks from '../Tasks';
import Employee from '../Employee';
import Project from '../Project';

import { Menu, Tab, Icon } from 'semantic-ui-react'
import '../../App.css';

class Main extends Component {
  getPane = (type,info) => {
    switch(type){

      case 'project':
        return <Project {...info} addPane={this.props.addPane}/>

      case 'applicant':
        return <Employee {...info} hireApplicant={this.props.hireApplicant} addPane={this.props.addPane}/>

      case 'employee':
        return <Employee {...info} updateEmployee={this.props.updateEmployee} updateEmployeeLevel={this.props.updateEmployeeLevel} fireEmployee={this.props.fireEmployee} addPane={this.props.addPane} projects={this.props.projects}/>

      case "email":
        return <Email emails={this.props.emails} addPane={this.props.addPane}/>

      case "tasks":
        return <Tasks tasks={this.props.tasks} addPane={this.props.addPane}/>

      default:
        return null
    }
  }
  getPaneName = (info) => {
    console.log(info);
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
        <Menu.Item key={info.type} onClick={()=>this.props.updatePane(i)}>
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
  render(){
    console.log('main props', this.props)
    const panes = [];
    for(let i = 0; i < this.props.panes.length; i++){
      const pane = this.buildPane(this.props.panes[i],i);
      panes.push(pane);
    }
    return (
        <Tab style={{width:'100%',height:'85vh',backgroundColor:'whitesmoke',overflowX:'scroll'}} panes={panes} activeIndex={this.props.activePane}/>
    );
  }
}

export default Main;
