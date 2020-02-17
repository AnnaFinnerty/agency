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
// import RandomProject from '../../Scripts/RandomProject';
// import RandomEmail from '../../Scripts/RandomEmail';
import RandomMessage from '../../Scripts/RandomMessage';
import EmployeeManager from '../../Scripts/EmployeeManager';
import ProjectManager from '../../Scripts/ProjectManager';
import EmailManager from '../../Scripts/EmailManager';
import TaskManager from '../../Scripts/TaskManager';
import MessageManager from '../../Scripts/MessageManager';
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
        {type:'email',pinned:true,permanent:true},
        {type:'tasks',pinned:true,permanent:true}
      ],
      updateParams: {
        emailFrequency: .15,
        projectFrequency: .05,
      },
    }

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
    
    const startYear = new Date().getFullYear() - 1;
    const time = this.getTime();

    const newProject = industry.newProject(false);
    console.log(this.projectManager)
    this.projectManager.addProject(newProject);
    this.emailManager.generateEmail('project',newProject,null,time);

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
    let hour = this.state.hour;
    let day = this.state.day;
    let month = this.state.month;
    let year = this.state.year;
    const tasks = this.state.tasks;

    

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
    const time = this.getTime();

    //if the agency runs out of cash or the bosses happiness drops to 0, you're fired
    if(this.state.agency.coh <= 0 || this.state.employees[0].happiness <= 0){
      this.emailManager.generateEmail(time,this.state.employees[0]);
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
      
      //update and find completed projects
      const completedProjects = this.projectManager.updateProjects(this.employeeManager.employeesByProject);
      //daily project update
      
      //remove complete projects
      for(let a = 0; a < completedProjects.completed.length; a++){
        const endTask = this.createTask("find a new project",3,"project")
        tasks.push(endTask);
        player.augmentScore(10);
        player.augmentReputation();
        player.augmentHappiness();
      }
      //remove failed projects
      for(let b = 0; b < completedProjects.failed.length; b++){
        player.augmentScore(-10);
        player.decrementReputation();
        player.decrementHappiness();
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
          this.projectManager.addProject(project);
          this.emailManager.generateEmail('project',project,null,time);
        }
      }
    }

    //monthly updates
    if(hour === 0 && day === 30){
      agency.monthlyUpdate(this.projectManager.projects);
    }

    //set new state
    this.setState({
      hour: hour,
      day: day,
      month: month,
      year: year,
      employees: this.employeeManager.employees,
      applicants: this.employeeManager.applicants,
      projects: this.projectManager.projects,
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
  getTime = () => {
    const time = {
      hour: this.state.hour,
      day: this.state.day,
      month: this.state.month,
      year: this.state.year,
      startYear: this.state.startYear,
    }
    return time
  }
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
  updateCollection = (collection,action,data) => {
    const collectionEmitters = {
       employees: this.employeeManager.emit,
       applicants: this.employeeManager.emit,
       emails: this.emailManager.emit,
       projects: this.projectManager.emit,
       tasks: this.taskManager.emit
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

      if(collection === "employees" || collection === "applicants"){
        //we need to update employees and applicants together because they are returned together
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
    const activePane = this.state.activePane === i ? i - 1: this.state.activePane;
    this.setState({
       panes: this.state.panes.filter((pane,x) => i !== x),
       activePane: activePane
    })
  }
  movePane = (previousPosition,newPosition) => {
    const panes = this.state.panes;
    const pane = panes.splice(previousPosition,1)[0];
    panes.splice(newPosition,0,pane);
    this.setState({
       panes: panes,
       activePane: newPosition
    })
  }
  togglePanePin = (i) => {
    const panes = this.state.panes;
    if(!panes[i].permanent){
      panes[i].pinned = !panes[i].pinned
    }
    this.setState({
      panes: panes
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
    const year = new Date().getFullYear();
    return (
      <React.Fragment>
          <div className="app">
                {
                  this.props.mobile ? '' :
                  <Sidebar  employees={this.state.employees} 
                            projects={this.state.projects} 
                            applicants={this.state.applicants} 
                            addPane={this.addPane}
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
                                movePane={this.movePane}
                                togglePanePin={this.togglePanePin}
                                generateTask={this.generateTask}
                                dismissTask={this.dismissTask}
                                resolveTask={this.resolveTask}
                                emails={this.state.emails}
                                tasks={this.state.tasks}
                                projects={this.state.projects}
                                employees={this.state.employees}
                                updateCollection={this.updateCollection} 
                                />
                        </div>
                <footer>&copy; {year} <a href="https://github.com/AnnaFinnerty">Annie Finnerty</a>  </footer>
                </div>
                <Message open={this.state.messageOpen} closeMessage={this.closeMessage} messages={this.state.messages} addMessage={this.addMessage}/>
      </React.Fragment>
    );
  }
}

export default Content;
