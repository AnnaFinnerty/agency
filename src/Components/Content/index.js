import React, {Component} from 'react';

import Header from '../Header';
import Main from '../Main';
import Sidebar from '../Sidebar';

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
      day: 365,
      hourLength: 2000,
      activePane: 0,
      panes: [
        {type:'email',pinned:true},
        {type:'tasks',pinned:true}
      ],
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
    console.log('agency',this.agency);
    numStartEmployees = numStartEmployees ? numStartEmployees : 15;
    const startEmployees = [];
    for(let i = 0 ; i < numStartEmployees; i ++){
      const startEmployee = this.randomEmployeeGenerator.generateRandomEmployee();
      startEmployees.push(startEmployee);
    }
    const sortedEmployees = this.sortEmployees(startEmployees);
    numStartProjects = numStartProjects ? numStartProjects : 3;
    const startProjects = [];
    const startApplicants = [];
    for(let i = 0 ; i < numStartProjects; i ++){
      const applicant = this.randomEmployeeGenerator.generateRandomEmployee();
      startApplicants.push(applicant);
      const startProject = this.randomProjectGenerator.generateRandomProject();
      startProject.printInfo();
      startProjects.push(startProject);
    }
    this.setState({
      employees: sortedEmployees,
      projects: startProjects,
      applicants: startApplicants,
      agency: agency
    })
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
  startTimer = () => {
    console.log('starting timer')
    this.interval = setInterval(()=>{
      const hour = this.state.hour >= 11 ? 0 : this.state.hour + 1;
      const day = this.state.hour >= 11 ? this.state.day + 1 : this.state.day;
      this.setState({
        hour: hour,
        day: day
      })
    },this.state.hourLength)
  }
  update = () => {

  }
  stopTimer = () => {
    console.log('stopping timer')
    clearInterval(this.interval)
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
  render(){
    return (
      <React.Fragment>
                <div className="app">
                  <Header hour={this.state.hour} 
                          day={this.state.day} 
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
      </React.Fragment>
    );
  }
}

export default Content;
