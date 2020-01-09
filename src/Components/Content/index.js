import React, {Component} from 'react';

import Header from '../Header';
import Main from '../Main';
import Sidebar from '../Sidebar';
import Message from '../Message';

import Industry from '../../Scripts/Industry';
import Agency from '../../Scripts/Agency';
import TaskManager from '../../Scripts/TaskManagers';
import RandomEmployee from '../../Scripts/RandomEmployee';
import RandomProject from '../../Scripts/RandomProject';

import TimerContext from '../App/timerContext';

import '../../App.css';


class Content extends Component {
  constructor(){
    super();
    this.state = {
      industry: null,
      agency: null,
      sidebarRight: false,
      projects: [],
      totalPositions: 20,
      employees: [],
      applicants: [],
      tasks: ['Task in content'],
      emails: ['Email in content'],
      mainContentType: 'tasks',
      mainContentIndex: 'null',
      update: false,
      hour: 0,
      day: 1,
      month: 1,
      year: 1,
      hourLength: 2000,
      activePane: 0,
      panes: [
        {type:'email',pinned:true},
        {type:'tasks',pinned:true}
      ],
      message: 'test message',
    }
    this.taskManager = new TaskManager();
    this.randomEmployeeGenerator = new RandomEmployee();
    this.randomProjectGenerator = new RandomProject();
  }
  componentDidMount(){
    this.start();
  }
  start = (numStartEmployees, numStartProjects) => {
    console.log("starting game");
    const agency = new Agency();
    const industry = new Industry();
    const startProjects = [];
    const startApplicants = [];
    numStartProjects = numStartProjects ? numStartProjects : 3;
    for(let i = 0 ; i < numStartProjects; i ++){
      const applicant = this.randomEmployeeGenerator.generateRandomEmployee();
      startApplicants.push(applicant);
      const startProject = this.randomProjectGenerator.generateRandomProject();
      startProjects.push(startProject);
    }
    numStartEmployees = numStartEmployees ? numStartEmployees : 15;
    const startEmployees = [];
    for(let i = 0 ; i < numStartEmployees; i ++){
      const startEmployee = this.randomEmployeeGenerator.generateRandomEmployee();
      startEmployees.push(startEmployee);
    }
    const sortedEmployees = this.sortEmployees(startEmployees);
    
    this.setState({
      employees: sortedEmployees,
      projects: startProjects,
      applicants: startApplicants,
      agency: agency,
      industry: industry
    })
  }
  startTimer = () => {
    console.log('starting timer')
    this.interval = setInterval(()=>{
      this.update();
    },this.state.hourLength)
  }
  update = () => {
    const hour = this.state.hour >= 11 ? 0 : this.state.hour + 1;
    const day = this.state.hour >= 11 ? this.state.day + 1 : this.state.day;  
    //daily updates
    const employees = this.state.employees;
    if(hour === 0){
      for(let a = 0; a < employees.length; a++){
        employees[a].update();
        if(employees[a]['quit']){
          employees.splice(a,1)
        }
      }
    }
    //hourly random events

    //set new state
    this.setState({
      hour: hour,
      day: day,
      employees: employees
    })

  }
  stopTimer = () => {
    console.log('stopping timer')
    clearInterval(this.interval)
  }
  hireApplicant = (info) => {
    console.log('hiring applicant', info)
    //TODO need to get id number
    this.setState({
      employees: [info, ...this.state.employees]
    })
  }
  fireEmployee = (info) => {
    console.log('firing employee', info)
    const employees = this.state.employees.filter((employee) => employee.id != info);
    const sortedEmployees = this.sortEmployees(employees);
    this.setState({
      employees: sortedEmployees
    })
  }
  sortEmployees = (employees) => {
    return employees.sort(function(a,b){return b.level - a.level})
  }
  generateEmail = (event) => {
    const email = "email";
    this.setState({
       emails: [email, ...this.state.emails]
    })
  }
  addPane = (type,info) => {
    console.log('adding pane');
    const pane = {type:type,info:info,pinned:false}
    this.setState({
      panes: [...this.state.panes,pane],
      activePane: this.state.panes.length
    })
  }
  removePane = (i) => {
    console.log('removing pane', i);
    const activePane = this.state.activePane === i ? i - 1: this.state.activePane;
    console.log('old active pane', this.state.activePane);
    console.log('new active pane', activePane);

    this.setState({
       panes: this.state.panes.filter((pane,x) => i !== x),
       activePane: activePane
    })
  }
  updatePane = (i) => {
    this.setState({
      activePane: i
    })
  }
  openMessage = (text) => {
    this.setState({
      message: text
    })
  }
  closeMessage = () => {
    this.setState({
      message: null
    })
  }
  render(){
    return (
      <React.Fragment>
                <div className="app">
                  <Header hour={this.state.hour} 
                          day={this.state.day}
                          month={this.state.month}
                          year={this.state.year}   
                          startTimer={this.startTimer} 
                          stopTimer={this.stopTimer}
                          agency={this.state.agency}
                          />
                        <div className="main-container">
                          <Sidebar employees={this.state.employees} projects={this.state.projects} applicants={this.state.applicants} addPane={this.addPane}/>
                          <Main panes={this.state.panes} 
                                activePane={this.state.activePane}
                                updatePane={this.updatePane} 
                                removePane={this.removePane}
                                hireApplicant={this.hireApplicant}
                                fireEmployee={this.fireEmployee}
                                emails={this.state.emails}
                                tasks={this.state.tasks}
                                />
                        </div>
                <footer></footer>
                </div>
                <Message open={this.state.message} text={this.state.message} closeMessage={this.closeMessage}/>
      </React.Fragment>
    );
  }
}

export default Content;
