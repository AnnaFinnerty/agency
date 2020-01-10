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
import RandomEmail from '../../Scripts/RandomEmail';

import '../../App.css';


class Content extends Component {
  constructor(){
    super();
    this.state = {
      //temp fix
      industry: new Industry(),
      agency: new Agency(),
      sidebarRight: true,
      projects: [],
      totalPositions: 20,
      employees: [],
      employeeStats: {
        productivity: 0,
        happiness: 0,
        salary: 0,
      },
      applicants: [],
      tasks: [],
      emails: [],
      hour: 0,
      day: 1,
      month: 1,
      year: 1,
      hourLength: 2000,
      timeRunning: false,
      activePane: 0,
      panes: [
        {type:'email',pinned:true},
        {type:'tasks',pinned:true}
      ],
      message: null,
    }
    this.taskManager = new TaskManager();
    this.randomEmployeeGenerator = new RandomEmployee();
    this.randomProjectGenerator = new RandomProject();
    this.randomEmailGenerator = new RandomEmail();
  }
  componentDidMount(){
    this.start();
  }
  start = (numStartEmployees, numStartProjects) => {
    console.log("starting game");
    // const agency = new Agency();
    // const industry = new Industry();
    const startProjects = [];
    const startApplicants = [];
    const startEmails = [];
    numStartProjects = numStartProjects ? numStartProjects : 3;
    for(let i = 0 ; i < numStartProjects; i ++){
      const applicant = this.randomEmployeeGenerator.generateRandomEmployee();
      startApplicants.push(applicant);
      const appEmail = this.randomEmailGenerator.generateEmail('applicant',applicant);
      startEmails.push(appEmail);
      const startProject = this.randomProjectGenerator.generateRandomProject();
      startProjects.push(startProject);
    }
    numStartEmployees = numStartEmployees ? numStartEmployees : 15;
    
    const startEmployees = this.randomEmployeeGenerator.generateStartEmployees(15,2,startProjects);

    const sortedEmployees = this.sortEmployees(startEmployees.employees);
    const welcomeEmail = this.randomEmailGenerator.generateEmail('start',sortedEmployees[0]);

    this.setState({
      employees: sortedEmployees,
      employeeStats: startEmployees.employeeStats,
      projects: startProjects,
      applicants: startApplicants,
      // agency: agency,
      // industry: industry,
      emails: [welcomeEmail,...startEmails],
      tasks: ['hire a new junior employee']
    })
  }
  startTimer = () => {
    console.log('starting timer')
    this.setState({
      timeRunning: true
    })
    this.interval = setInterval(()=>{
      this.update();
    },this.state.hourLength)
  }
  update = () => {
    //update time 
    let hour = this.state.hour;
    let day = this.state.day;
    let month = this.state.month;
    let year = this.state.year;
    if(this.state.hour >= 11){
      //new day
      hour = 0;
      if(this.state.day >= 30){
        //new month
        day = 0;
        if(this.state.month >= 12){
          month = 1
        } else {
          //new year
          month = this.state.month + 1;
          year = this.state.year + 1;

        }
      } else {
        day = this.state.day + 1;
      }
    } else {
      hour = this.state.hour + 1;
    }
    
    //daily updates
    const employees = this.state.employees;
    const tasks = this.state.tasks;
    const emails = this.state.emails;
    const employeeStatsRaw = {
      productivity: 0,
      happiness: 0,
      salary: 0,
    }

    //update employees and get stats
    if(hour === 0){
      for(let a = 0; a < employees.length; a++){
        //run employee update method
        employees[a].update();
        //get new employee stats and add to stats dict
        employeeStatsRaw.productivity += employees[a].stats.productivity
        employeeStatsRaw.happiness += employees[a].stats.happiness
        employeeStatsRaw.salary += employees[a].stats.salary
        if(employees[a]['quit']){
          tasks.push('hire someone new');
          const quitEmail = this.randomEmailGenerator.generateEmail('quit',employees[a]);
          emails.unshift(quitEmail);
          employees.splice(a,1)
        }
      }
      console.log('employee stats raw',employeeStatsRaw);
      const employeeStats = {
        productivity: employeeStatsRaw.productivity/employees.length,
        happiness: employeeStatsRaw.happiness/employees.length,
        salary: employeeStatsRaw.salary/employees.length,
      }
      console.log('employee stats',employeeStats);
      //hourly random events
      const r = Math.random();
      if(r < .5){

      }
    } 
    
    //set new state
    this.setState({
      hour: hour,
      day: day,
      month: month,
      year: year,
      employees: employees,
      emails: emails,
      tasks: tasks
    })
  }
  stopTimer = () => {
    console.log('stopping timer')
    clearInterval(this.interval);
    this.setState({
      timeRunning: false
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
    const employees = this.state.employees.filter((employee) => employee.id !== info);
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
  deleteEmail = (i) => {

  }
  generateTask = (event) => {
    const task = "task";
    this.setState({
       tasks: [task, ...this.state.tasks]
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
    console.log('content state', this.state)
    return (
      <React.Fragment>
                <div className="app">
                  <Header hour={this.state.hour} 
                          day={this.state.day}
                          month={this.state.month}
                          year={this.state.year}
                          timeRunning={this.state.timeRunning}   
                          startTimer={this.startTimer} 
                          stopTimer={this.stopTimer}
                          agency={this.state.agency}
                          industry={this.state.industry}
                          employeeStats={this.state.employeeStats}
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
