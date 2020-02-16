import React, {Component} from 'react';

import Header from '../Header';
import Main from '../Main';
import Sidebar from '../Sidebar';
import Message from '../Message';

import Player from '../../Scripts/Player'
import Industry from '../../Scripts/Industry';
import Agency from '../../Scripts/Agency';
// import TaskManager from '../../Scripts/TaskManagers';
// import RandomEmployee from '../../Scripts/RandomEmployee';
import RandomProject from '../../Scripts/RandomProject';
// import RandomEmail from '../../Scripts/RandomEmail';
import RandomMessage from '../../Scripts/RandomMessage';
import EmployeeManager from '../../Scripts/EmployeeManager';
import ProjectManager from '../../Scripts/ProjectManager';
import EmailManager from '../../Scripts/EmailManager';
import TaskManager from '../../Scripts/TaskManager';
import Helpers from '../../Scripts/Helpers';

import '../../App.css';
import MessageManager from '../../Scripts/MessageManager';


class Content extends Component {
  constructor(){
    super();
    this.state = {
      //temp fix
      fired: false,
      industry: new Industry(),
      agency: new Agency(),
      player: new Player(),
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
    // this.taskManager = new TaskManager();
    // this.randomEmployeeGenerator = new RandomEmployee();
    this.randomProjectGenerator = new RandomProject();
    // this.randomEmailGenerator = new RandomEmail();
    this.randomMessageGenerator = new RandomMessage();
    this.employeeManager = new EmployeeManager();
    this.projectManager = new ProjectManager();
    this.emailManager = new EmailManager();
    this.taskManager = new TaskManager();
    this.messageManager = new MessageManager();
    this.helpers = new Helpers();
  }
  componentDidMount(){
    this.start();
  }
  start = (numStartEmployees, numStartProjects) => {
    console.log("starting game");
    const industry = new Industry();
    const agency = new Agency();
    // const startProjects = [];
    // const startApplicants = [];
    // const startEmails = [];

    const startYear = new Date().getFullYear() - 1;
    const time = {
      hour: this.state.hour,
      day: this.state.day,
      month: this.state.month,
      year: startYear,
      startYear: startYear,
    }

    const newProject = industry.newProject(false);
    console.log(this.projectManager)
    this.projectManager.addProject(newProject);
    this.emailManager.generateEmail('project',newProject,null,time);
    // startEmails.push(newProjectEmail);

    numStartProjects = numStartProjects ? numStartProjects : 3;
    for(let i = 0 ; i < numStartProjects; i ++){
      //generate one random applicant per current project
      const applicant = this.employeeManager.newApplicant();
      this.emailManager.generateEmail('applicant',applicant,null,time);
      //generate a random start project -- true flag means it will be in progress when it starts
      const startProject = industry.newProject(true);
      this.projectManager.addProject(startProject);
    }
    this.employeeManager.newEmployees(7,1,this.projectManager.projects);

    //now that employees have been assigned, update projects with employee info
    this.projectManager.updateProjectProductity(this.employeeManager.employeesByProject)

    //generate welcome email
    this.emailManager.generateEmail('start',this.employeeManager.boss,null,time);

    //update agency income/expenses based on employees/projects
    agency.calculateAgencyParameters(this.employeeManager.employees,this.projectManager.projects);

    const startTask = this.createTask("hire a new employee",3,"hire")

    this.setState({
      industry: industry,
      agency: agency,
      employees: this.employeeManager.employees,
      employeeStats: this.employeeManager.employeeStats,
      projects: this.projectManager.projects,
      applicants: this.employeeManager.applicants,
      emails: this.emailManager.emails,
      tasks: [startTask],
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
    let player = this.state.player;
    // let newEmployeeStats = this.state.employeeStats;
    let hour = this.state.hour;
    let day = this.state.day;
    let month = this.state.month;
    let year = this.state.year;
    // const employees = this.state.employees;
    // const applicants = this.state.applicants;
    let projects = this.state.projects;
    const tasks = this.state.tasks;

    
    const time = {
      hour: this.state.hour,
      day: this.state.day,
      month: this.state.month,
      year: this.state.year,
      startYear: this.state.startYear,
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
    
    //if the agency runs out of cash or the bosses happiness drops to 0, you're fired
    if(this.state.agency.coh <= 0 || this.state.employees[0].happiness <= 0){
      this.emailManager.generateEmail(time,this.state.employees[0]);
      // emails.unshift(email);
      this.setState({
        emails: this.emailManager.emails
      })
      return
    }
    //MTC select random update hour
    // const updateHour = Math.floor(Math.random())
    //daily updates
    if(hour === 0){
      //update employees and identify employees that have quit
      const quitEmployees = this.employeeManager.updateEmployees();
      for(let i = 0; i < quitEmployees.length; i++){
        const t = this.createTask("hire a new employee to replace " + quitEmployees[i].name.display,quitEmployees[i].level,"hire")
        tasks.push(t);
        this.emailManager.generateEmail('quit',quitEmployees[i],null,time);
        player.decrementReputation();
      }
   
      const projectsToDelete = [];
      //daily project update
      for(let a = 0; a < projects.length; a++){
        //update project productivity 
        const employees = this.employeeManager.getEmployeesByProject(projects[a].id);
        projects[a].calculateProductivity(employees);
        //find completed projects
        if(projects[a].complete){
          projectsToDelete.push(projects[a]);
          const endTask = this.createTask("find a new project",3,"project")
          tasks.push(endTask);
          player.augmentScore(10);
          player.augmentReputation();
          player.augmentHappiness();
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
      const boss = this.employeeManager.boss;
      const employee1 = this.helpers.RandomFromArray(this.employeeManager.employees);
      const employee2 = this.helpers.RandomFromArray(this.employeeManager.employees);
      // console.log(employee);
      this.emailManager.generateRandomEmail(boss,employee1,employee2,time);
  
      
      //generate random message
      const employee3 = this.helpers.RandomFromArray(this.employeeManager.employees);
      this.messageManager.addRandomMessage(employee3,time);
  

      if(hour%2===0 && this.state.applicants < 8){
        //generate a new applicant
        if(this.state.applicants.length < 10){
          const applicant = this.employeeManager.newApplicant();
          this.emailManager.generateEmail('applicant',applicant,null,time);
        }
      }
      if(r < this.state.updateParams.projectFrequency){
        //send a new project offer
        if(this.state.projects.length < 10){
          //generate new project
          //add: be able to use an old company
          const project = this.state.industry.newProject();
          projects.push(project);
          this.emailManager.generateEmail('project',project,null,time);
        }
      }
    }

    //monthly updates
    if(hour === 0 && day === 30){
      projects = agency.monthlyUpdate(projects);
    }

    //set new state
    this.setState({
      hour: hour,
      day: day,
      month: month,
      year: year,
      employees: this.employeeManager.employees,
      applicants: this.employeeManager.applicants,
      projects: projects,
      emails: this.emailManager.emails,
      messages: this.messageManager.messages,
      tasks: tasks,
      agency: agency,
      employeeStats: this.employeeManager.employeeStats,
      player: player,
    })
  }
  stopTimer = () => {
    console.log('stopping timer')
    clearInterval(this.interval);
    this.setState({
      timeRunning: false
    })
  }
  // hireApplicant = (applicant) => {
  //   //mtc check to see if this completes a task
  //   console.log('hiring applicant', applicant)
  //   //TODO need to get new id number for applicant
  //   applicant.id = this.randomEmployeeGenerator.generateEmployeeID();
  //   const agency = this.state.agency;
  //   const employees = this.sortEmployees([applicant, ...this.state.employees])
  //   agency.calculateAgencyParameters(employees,this.state.projects);
  //   this.setState({
  //     employees: employees,
  //     applicants:  this.state.applicants.filter((a) => applicant.id !== a.id),
  //     agency: agency
  //   })
  // }
  // dismissApplicant = (info) => {
  //   console.log('dismissing applicant', info)
  //   this.setState({
  //     applicants:  this.state.applicants.filter((applicant) => applicant.id !== info.id)
  //   })
  // }
  // updateEmployee = (updatedEmployee) => {
  //   //mtc check to see if this completes a task
  //   console.log('updating employee');
  //   console.log(updatedEmployee);
  //   const employees = this.state.employees.map((employee) => employee.id !== updatedEmployee.id ? employee: updatedEmployee);
  //   if(updatedEmployee.projectId === null){
  //     updatedEmployee.project.removeWorker(updatedEmployee);
  //   }
  //   updatedEmployee.project.calculateProductivity();
  //   const projects = this.state.projects.filter((project) => project.id !== updatedEmployee.project.id ? project : updatedEmployee.project);
  //   const agency = this.state.agency;
  //   agency.calculateAgencyParameters(employees,projects);
  //   console.log(updatedEmployee);
  //   this.setState({
  //     employees: employees,
  //     projects: projects,
  //     agency: agency
  //   })
  // }
  // updateEmployeeLevel = (updatedEmployee) => {
  //   //mtc check to see if this completes a task
  //   console.log('promoting or demoting employee');
  //   const employees = this.state.employees.map((employee) => employee.id !== updatedEmployee.id ? employee: updatedEmployee);
  //   this.setState({
  //     employees: employees
  //   })
  // }
  // fireEmployee = (info) => {
  //   console.log('firing employee', info)
  //   const employees = this.state.employees.filter((employee) => employee.id !== info);
  //   const sortedEmployees = this.sortEmployees(employees);
  //   const agency = this.state.agency;
  //   //mtc check to see if this completes a task, and remove task
  //   agency.calculateAgencyParameters(employees,this.state.projects);
  //   this.setState({
  //     employees: sortedEmployees,
  //     panes: this.state.panes.filter((pane) => pane.id !== "employee_"+info),
  //     activePane: this.state.activePane - 1,
  //   })
  // }
  // sortEmployees = (employees) => {
  //   return employees.sort(function(a,b){return b.level - a.level})
  // }
  // sendEmail = (email) => {
  //   const player = this.state.player;
  //   const agency = this.state.agency;
  //   let employees = this.state.employees;
  //   if(email.type === 'request'){
  //     player.augmentReputation();
  //     player.decrementHappiness();
  //     agency.debit(email.cost);
  //     employees = employees.map((employee)=>{employee.satisfy(10);return employee})
  //   } else {
  //     player.decrementReputation();
  //   }
  //   this.setState({
  //      emails: [email, ...this.state.emails],
  //      employees: employees,
  //      agency: agency,
  //      player: player
  //   })
  // }
  // readEmail = (i) => {
  //   console.log('reading email');
  //   const updatedEmail = this.state.emails[i];
  //   updatedEmail.read = true;
  //   const emails = this.state.emails.map((email,x) => x !== i ? email: updatedEmail);
  //   this.setState({
  //     emails: emails
  //   })
  // }
  // archiveEmail = (i) => {
  //   console.log('archiving email');
  //   const updatedEmail = this.state.emails[i];
  //   updatedEmail.archived = true;
  //   const emails = this.state.emails.map((email,x) => x !== i ? email: updatedEmail);
  //   this.setState({
  //     emails: emails
  //   })
  // }
  // deleteEmail = (i) => {
  //   this.setState({
  //     emails: this.state.emails.filter((email,x) => x !== i)
  //   })
  // }
  createTask = (text,urgency,action,requester,type,target) => {
    const task = {
      text: text,
      urgency: urgency,
      requester: requester ? requester : "",
      type: type,
      target: target,
      action: action
    };
    return task
  }
  generateTask = (text,urgency,requester,type,target,action) => {
    console.log('generating task')
    const player = this.state.player;
    player.augmentReputation();
    const newTask = this.createTask(text,urgency,requester,type,target,action);
    this.setState({
       tasks: [newTask, ...this.state.tasks],
       player: player
    })
  }
  resolveTask = (i, task) => {
    console.log('resolving task: ');
    console.log(task)
    const player = this.state.player;
    const agency = this.state.agency;
    player.augmentReputation();
    let employees = this.state.employees;
    let tasks = this.state.tasks;
    if(task){
       //increase employee happiness because of resolved task
      
      if(task.type === "request"){
        if(task.subtype){
          if(task.subtype === "money"){
            agency.debit(task.importance * (this.state.year - this.state.startYear))
          } else if (task.subtype === "time"){
            task.target.vacation(task.target.level)
          }
        }
      }
      if(task.type === "request" || task.type === "task"){
        task.target.requestSatisfied();
        employees = this.state.employees.map((employee) => employee.id !== task.target.id ? employee: task.target);
      } 
    }
    //only remove existing tasks -- ie tasks that have an index number
    if(i){
      tasks = this.state.tasks.filter((t,x) => x !== t)
    }
    
    this.setState({
      tasks: tasks,
      player: player,
      employees: employees,
      agency: agency,
    })
  }
  dismissTask = (i, task) => {
    console.log('dismissing tasks')
    let tasks = i ?this.state.tasks.filter((task,x) => x!==i ): this.state.tasks;
    const player = this.state.player;
    player.decrementReputation();
    let employees = this.state.employees;
    if(task){
       //increase employee happiness because of resolved task
      if(task.type === "request" || task.type === "task"){
        task.target.requestDenied();
        employees = this.state.employees.map((employee) => employee.id !== task.target.id ? employee: task.target);
      } 
    }
    this.setState({
       tasks: tasks,
       player: player,
       employees: employees
    })
  }
  checkTaskResolution = (array,taskType,targetId) => {
    for(let i = 0; i < array.length; i++){
      if(array[i].type === taskType){
        console.log('task found')
      }
    }
  }
  // addMessage = (message) => {
  //   this.setState({
  //     messages: [...this.state.messages,message]
  //   })
  // }
  considerProject = (consideredProject) => {
    console.log('considering project', consideredProject);
    consideredProject.considering = true;
    const projects = this.state.projects.map((project) => project.id !== consideredProject.id ? project: consideredProject);
    this.setState({
      projects: projects
    })
  }
  acceptProject = (consideredProject) => {
    console.log('accepting project', consideredProject);
    consideredProject.accepted = true;
    const projects = this.state.projects.map((project) => project.id !== consideredProject.id ? project: consideredProject);
    console.log(projects);
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
    console.log(this.state.projects);
    this.setState({
      projects: this.state.projects.filter((project) => project.id !== withdrawnProject),
      panes: this.state.panes.filter((pane) => pane.id !== "project_"+withdrawnProject),
      activePane: this.state.activePane - 1
    })
  }
  updateCollection = (collection,action,data) => {
    const collectionEmitters = {
       employees: this.employeeManager.emit,
       applicants: this.employeeManager.emit,
       emails: this.emailManager.emit,
       projects: this.projectManager.emit,
    }
    if(collectionEmitters[collection]){
      //pass action and data to requested data collection
      const cb = collectionEmitters[collection];
      const result = cb(action,data);
      //remove active pane if item has been deleted
      let panes = this.state.panes;
      let activePane = this.state.activePane;
      if(action === "fire" || action === "hire" || action === "dismiss"){
        //generate pane id based on data/collection name
        const id = data.id ? data.id : data;
        const name = collection.slice(0,collection.length-1);
        panes = this.state.panes.filter((pane) => pane.id !== name + "_"+id)
        activePane = this.state.activePane -1;
      }

      if(action === "hire"){
        //if someone's been hired, we need to update employees and applicants
        this.setState({
          employees: result.employees,
          applicants: result.applicants,
          panes: panes,
          activePane:activePane
        })
      } else {
        //otherwise just update the collection with the manager's result
        this.setState({
          [collection]: result,
          panes: panes,
          activePane:activePane
        })
      }
    } else {
      console.log('collection emitter not found for ' + collection)
    }

  }
  addPane = (type,info) => {
    console.log('adding pane',info);
    const id = type+"_"+info.id;
    //check to see if the request pane if already open
    for(let i = 0; i < this.state.panes.length; i++){
      console.log('id',this.state.panes[i].id)
      if(this.state.panes[i].id === id){
        this.setState({
          activePane: i
        })
        return
      }
    }
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
                {
                  this.props.mobile ? '' :
                  <Sidebar  employees={this.state.employees} 
                            projects={this.state.projects} 
                            applicants={this.state.applicants} 
                            addPane={this.addPane}
                            // dismissApplicant={this.dismissApplicant}
                            appOpenModal={this.props.appOpenModal}
                            mobile={this.props.mobile}
                            updateCollection={this.updateCollection}
                      />
                }
                      
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
                          score={this.state.player.score}
                          reputation={this.state.player.reputation}
                          appOpenModal={this.props.appOpenModal}
                          mobile={this.props.mobile}
                          />
                          {
                            !this.props.mobile ? '' :
                            <Sidebar  employees={this.state.employees} 
                                          projects={this.state.projects} 
                                          applicants={this.state.applicants} 
                                          addPane={this.addPane}
                                          // dismissApplicant={this.dismissApplicant}
                                          appOpenModal={this.props.appOpenModal}
                                          mobile={this.props.mobile}
                                          updateCollection={this.updateCollection}
                                />
                          }
                          <Main panes={this.state.panes} 
                                activePane={this.state.activePane}
                                addPane={this.addPane}
                                updatePane={this.updatePane} 
                                removePane={this.removePane}
                                // hireApplicant={this.hireApplicant}
                                // dismissApplicant={this.dismissApplicant}
                                // updateEmployee={this.updateEmployee}
                                // updateEmployeeLevel={this.updateEmployeeLevel}
                                // fireEmployee={this.fireEmployee}
                                generateTask={this.generateTask}
                                dismissTask={this.dismissTask}
                                resolveTask={this.resolveTask}
                                considerProject={this.considerProject}
                                acceptProject={this.acceptProject}
                                rejectProject={this.rejectProject}
                                withdrawProject={this.withdrawProject}
                                // readEmail={this.readEmail}
                                sendEmail={this.sendEmail}
                                archiveEmail={this.archiveEmail}
                                emails={this.state.emails}
                                tasks={this.state.tasks}
                                projects={this.state.projects}
                                employees={this.state.employees}
                                updateCollection={this.updateCollection} 
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
