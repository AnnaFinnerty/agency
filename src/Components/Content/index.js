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
import RandomMessage from '../../Scripts/RandomMessage';
import Helpers from '../../Scripts/Helpers';

import '../../App.css';


class Content extends Component {
  constructor(){
    super();
    this.state = {
      //temp fix
      fired: false,
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
      messages: [],
      hour: 1,
      day: 29,
      month: 1,
      year: 0,
      startYear: null,
      hourLength: 750,
      timeRunning: false,
      activePane: 0,
      panes: [
        {type:'email',pinned:true},
        {type:'tasks',pinned:true}
      ],
      updateParams: {
        emailFrequency: .15,
        projectFrequency: .05,
      },
    }
    this.taskManager = new TaskManager();
    this.randomEmployeeGenerator = new RandomEmployee();
    this.randomProjectGenerator = new RandomProject();
    this.randomEmailGenerator = new RandomEmail();
    this.randomMessageGenerator = new RandomMessage();
    this.helpers = new Helpers();
  }
  componentDidMount(){
    this.start();
  }
  start = (numStartEmployees, numStartProjects) => {
    console.log("starting game");
    const industry = new Industry();
    const agency = new Agency();
    const startProjects = [];
    const startApplicants = [];
    const startEmails = [];

    const newProject = industry.newProject(false);
    startProjects.push(newProject);
    const newProjectEmail = this.randomEmailGenerator.generateEmail('project',newProject);
    startEmails.push(newProjectEmail);

    numStartProjects = numStartProjects ? numStartProjects : 3;
    for(let i = 0 ; i < numStartProjects; i ++){
      const applicant = this.randomEmployeeGenerator.generateRandomEmployee();
      startApplicants.push(applicant);
      const appEmail = this.randomEmailGenerator.generateEmail('applicant',applicant);
      startEmails.push(appEmail);
      const startProject = industry.newProject(true);
      startProjects.push(startProject);
    }
    
    

    const startEmployees = this.randomEmployeeGenerator.generateStartEmployees(7,1,startProjects);
    const sortedEmployees = this.sortEmployees(startEmployees.employees);
    const welcomeEmail = this.randomEmailGenerator.generateEmail('start',sortedEmployees[0]);

    //update agency income/expenses based on employees/projects
    agency.calculateAgencyParameters(startEmployees.employees,startProjects);

    const startYear = new Date().getFullYear();

    this.setState({
      industry: industry,
      agency: agency,
      employees: sortedEmployees,
      employeeStats: startEmployees.employeeStats,
      projects: startEmployees.startProjects,
      applicants: startApplicants,
      emails: [...startEmails,welcomeEmail],
      tasks: ['hire a new junior employee'],
      startYear: startYear
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
    const agency = this.state.agency;
    let newEmployeeStats = this.state.employeeStats;
    let hour = this.state.hour;
    let day = this.state.day;
    let month = this.state.month;
    let year = this.state.year;
    const employees = this.state.employees;
    const applicants = this.state.applicants;
    let projects = this.state.projects;
    const tasks = this.state.tasks;
    const emails = this.state.emails;
    const messages = this.state.messages;
    
    const employeeStatsRaw = {
      productivity: 0,
      happiness: 0,
      salary: 0,
    }

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
    
    //if the agency runs out of cash or the bosses happiness drops to 0
    // you're fired
    if(this.state.agency.coh <= 0 || this.state.employees[0].happiness <= 0){
      const email = this.randomEmailGenerator.fireEmail(this.state.employees[0]);
      emails.unshift(email);
      this.setState({
        emails: emails
      })
      return
    }
    //MTC select random update hour
    // const updateHour = Math.floor(Math.random())
    //daily updates
    if(hour === 0){
      //daily employee update
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
      newEmployeeStats = {
        productivity: Math.floor(employeeStatsRaw.productivity/employees.length),
        happiness: Math.floor(employeeStatsRaw.happiness/employees.length),
        salary: Math.floor(employeeStatsRaw.salary/employees.length),
      }
      const projectsToDelete = [];
      //daily project update
      for(let a = 0; a < projects.length; a++){
        //update project productivity 
        projects[a].calculateProductivity();
        //find completed projects
        if(projects[a].complete){
          projectsToDelete.push(projects[a]);
        }
      }
      //remove completed projects
      for(let b = 0; b < projectsToDelete.length; b++){
        projects.splice(projectsToDelete[b],1);
      }
    } 
    
    //hourly random events
    const r = Math.random();
    if(r < this.state.updateParams.emailFrequency){
    // if(true){
      //generate random emails
      const boss = employees[0];
      const employee1 = this.helpers.RandomFromArray(employees);
      const employee2 = this.helpers.RandomFromArray(employees);
      // console.log(employee);
      const email = this.randomEmailGenerator.generateRandomEmail(boss,employee1,employee2);
      emails.unshift(email)
      
      //generate random message
      const employee3 = this.helpers.RandomFromArray(employees);
      const message = this.randomMessageGenerator.generateMessage(null,"3:00pm",employee3);
      messages.push(message)

      if(hour%2===0 && this.state.applicants < 8){
        //generate a new applicant
        if(this.state.applicants.length < 10){
          const applicant = this.randomEmployeeGenerator.generateRandomEmployee();
          applicants.push(applicant);
          const appEmail = this.randomEmailGenerator.generateEmail('applicant',applicant);
          emails.push(appEmail);
        }
      }
      if(r < this.state.updateParams.projectFrequency){
        //send a new project offer
        if(this.state.projects.length < 10){
          //generate new project
          //add: be able to use an old company
          const project = this.state.industry.newProject();
          projects.push(project);
          const newProjectEmail = this.randomEmailGenerator.generateEmail('project',project);
          emails.push(newProjectEmail);
        }
      }
    }

    //monthly updates
    if(hour === 0 && day === 30){
      projects = agency.monthlyUpdate(projects);
    }

    //constrain maximum amount of emails/messages
    const finalEmails = emails.length > 100 ? emails.splice(0,100) : emails;
    const finalMessages = messages.length > 100 ? messages.splice(0,100) : messages;
    //set new state
    this.setState({
      hour: hour,
      day: day,
      month: month,
      year: year,
      employees: employees,
      projects: projects,
      emails: finalEmails,
      messages: finalMessages,
      tasks: tasks,
      agency: agency,
      employeeStats: newEmployeeStats,
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
    //TODO need to get new id number for applicant
    this.setState({
      employees: [info, ...this.state.employees]
    })
  }
  updateEmployee = (updatedEmployee) => {
    console.log('updating employee');
    console.log(updatedEmployee);
    const employees = this.state.employees.map((employee) => employee.id !== updatedEmployee.id ? employee: updatedEmployee);
    if(updatedEmployee.projectId === null){
      updatedEmployee.project.removeWorker(updatedEmployee);
    }
    updatedEmployee.project.calculateProductivity();
    const projects = this.state.projects.filter((project) => project.id !== updatedEmployee.project.id ? project : updatedEmployee.project);
    const agency = this.state.agency;
    agency.calculateAgencyParameters(employees,projects);
    console.log(updatedEmployee);
    this.setState({
      employees: employees,
      projects: projects,
      agency: agency
    })
  }
  updateEmployeeLevel = (updatedEmployee) => {
    console.log('promoting or demoting employee');
    const employees = this.state.employees.map((employee) => employee.id !== updatedEmployee.id ? employee: updatedEmployee);
    this.setState({
      employees: employees
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
  dismissApplicant = (info) => {
    console.log('dismissing applicant', info)
    this.setState({
      applicants:  this.state.applicants.filter((applicant) => applicant.id !== info)
    })
  }
  generateEmail = (event) => {
    const email = "email";
    this.setState({
       emails: [email, ...this.state.emails]
    })
  }
  deleteEmail = (i) => {
    this.setState({
      emails: this.state.emails.filter((email,x) => x !== i)
    })
  }
  generateTask = (test,requester,type,target,action,) => {
    const task = "task";
    this.setState({
       tasks: [task, ...this.state.tasks]
    })
  }
  resolveTask = (i) => {
    console.log('resolving task: ' + i)
    this.setState({
      tasks: this.state.tasks.filter((tasks,x) => x !== i)
    })
  }
  dismissTask = (i) => {
    this.setState({
       tasks: this.state.tasks.filter((task,x) => x!==i )
    })
  }
  addMessage = (message) => {
    this.setState({
      messages: [...this.state.messages,message]
    })
  }
  considerProject = (consideredProject) => {
    console.log('considering project', consideredProject);
    consideredProject.consider = true;
    const projects = this.state.projects.map((project) => project.id !== consideredProject.id ? project: consideredProject);
    this.setState({
      projects: projects
    })
  }
  acceptProject = (consideredProject) => {
    console.log('accepting project', consideredProject);
    consideredProject.accepted = true;
    const projects = this.state.projects.map((project) => project.id !== consideredProject.id ? project: consideredProject);
    this.setState({
      projects: projects
    })
  }
  rejectProject = (rejectedProject) => {
    console.log('rejecting project', rejectedProject)
    this.setState({
      projects: this.state.projects.filter((project) => project.id !== rejectedProject)
    })
  }
  withdrawProject = (withdrawnProject) => {
    console.log('withdraw project', withdrawnProject)
    //call to industry to decrease company satisfaction
    // console.log('removing pane', i);
    // const activePane = this.state.activePane === i ? i - 1: this.state.activePane;
    // console.log('old active pane', this.state.activePane);
    // console.log('new active pane', activePane);
    console.log(this.state.projects);
    this.setState({
      projects: this.state.projects.filter((project) => project.id !== withdrawnProject),
      panes: this.state.panes.filter((pane) => pane.id !== "project_"+withdrawnProject),
      activePane: this.state.activePane - 1
    })
  }
  addPane = (type,info) => {
    console.log('adding pane',info);
    const pane = {type:type,info:info,pinned:false,id:type+"_"+info.id}
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
    // console.log('content state', this.state)
    return (
      <React.Fragment>
          <div className="app">
                      <Sidebar  employees={this.state.employees} 
                                projects={this.state.projects} 
                                applicants={this.state.applicants} 
                                addPane={this.addPane}
                                dismissApplicant={this.dismissApplicant}
                      />
                        <div className="main-container">
                        <Header 
                          hour={this.state.hour} 
                          day={this.state.day}
                          month={this.state.month}
                          year={this.state.year}
                          startYear={this.state.startYear}
                          timeRunning={this.state.timeRunning}   
                          startTimer={this.startTimer} 
                          stopTimer={this.stopTimer}
                          agency={this.state.agency}
                          projects={this.state.projects}
                          industry={this.state.industry}
                          employeeStats={this.state.employeeStats}
                          />
                          
                          <Main panes={this.state.panes} 
                                activePane={this.state.activePane}
                                addPane={this.addPane}
                                updatePane={this.updatePane} 
                                removePane={this.removePane}
                                hireApplicant={this.hireApplicant}
                                dismissApplicant={this.dismissApplicant}
                                updateEmployee={this.updateEmployee}
                                updateEmployeeLevel={this.updateEmployeeLevel}
                                fireEmployee={this.fireEmployee}
                                resolveTask={this.resolveTask}
                                considerProject={this.considerProject}
                                acceptProject={this.acceptProject}
                                rejectProject={this.rejectProject}
                                withdrawProject={this.withdrawProject}
                                emails={this.state.emails}
                                tasks={this.state.tasks}
                                projects={this.state.projects}
                                employees={this.state.employees} 
                                />
                        </div>
                <footer></footer>
                </div>
                <Message open={this.state.messageOpen} closeMessage={this.closeMessage} messages={this.state.messages} addMessage={this.addMessage}/>
      </React.Fragment>
    );
  }
}

export default Content;
