import React from 'react';

import ModalContext from '../Modal/context'; 
import PersonalIcon from '../Employee/icon';

import '../../App.css';
import { Tab, Grid, Menu, Icon } from 'semantic-ui-react'

const SidebarWrapper = (props) => {

  return(
    <ModalContext.Consumer>
      {({open,openModal}) => (
        <Sidebar {...props} open={open} openModal={openModal} />
      )}
    </ModalContext.Consumer>
  )
}

//sections: employees, project
function Sidebar(props) {
  // console.log('sidebar props',props)
  const employees = props.employees.map((employee) => {
    return(
      <div key={employee.id} className="hover">
        <Grid celled onClick={()=>props.addPane('employee',employee)}>
          <Grid.Row columns={2}  style={{padding:'0'}}>
              <Grid.Column width={6}>
                <PersonalIcon icon={employee.icon}/>
                {employee.name.display}
                {
                  employee.level === 5 ? "*" : ""
                }
              </Grid.Column>
              <Grid.Column width={8}>
                {employee.title}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2} style={{padding:'0'}}>
              <Grid.Column width={10}>
                {
                  !employee.projectId ? '' :
                  employee.project.shortName
                }
              </Grid.Column>
              <Grid.Column width={1}>
                {employee.level}
              </Grid.Column>
              <Grid.Column width={1}>
                {employee.stats.happiness}
              </Grid.Column>
          </Grid.Row>
      </Grid>
      </div>
    )
  })
  const projects = props.projects.map((project) => {
    if(project.considering || project.accepted){
      return(
        <Grid.Row className="hover" columns={4} key={project.id} onClick={()=>props.addPane('project',project)}>
          <Grid.Column width={7}>{project.name}</Grid.Column>
          <Grid.Column width={1}>{project.workers.length}</Grid.Column>
          <Grid.Column width={1}>{project.productivity}%</Grid.Column>
          <Grid.Column width={1}>{project.monthsToCompletion}</Grid.Column>
          <Grid.Column width={1}>{project.percentComplete}%</Grid.Column>
        </Grid.Row>
      )
    }
  })
  const applicants = props.applicants.map((applicant) => {
    return(
      <Grid.Row className="hover" columns={3} key={applicant.id}> 
        <Grid.Column onClick={()=>props.addPane('applicant',applicant)}>
        {applicant.name.display}
        </Grid.Column>
        <Grid.Column onClick={()=>props.addPane('applicant',applicant)}>
        {applicant.skills}
        </Grid.Column>
        <Grid.Column>
          <button onClick={()=>props.dismissApplicant(applicant.id)} >x</button>
        </Grid.Column>
      </Grid.Row>
    )
  })
  const panes = [
    { menuItem: (<Menu.Item style={{padding: '1vh 1vw'}}>Employees</Menu.Item>), 
      render: () => <Tab.Pane style={{height: '85vh',overflowY:"scroll",backgroundColor:'gainsboro'}}>{employees}</Tab.Pane> },
    { menuItem: (<Menu.Item style={{padding: '1vh 1vw'}}>Applicants</Menu.Item>), 
      render: () => <Tab.Pane style={{height: '85vh',overflowY:"scroll",backgroundColor:'gainsboro'}}>
                        <Grid columns={1}> {applicants}</Grid></Tab.Pane> },
    { menuItem: (<Menu.Item style={{padding: '1vh 1vw'}}>Projects</Menu.Item>), 
      render: () => 
      <Tab.Pane style={{height: '85vh',overflowY:"scroll",backgroundColor:'gainsboro'}}>
        <Grid columns={1}>
          <Grid.Row columns={4}>
            <Grid.Column width={7}>name</Grid.Column>
            <Grid.Column width={1}><Icon name="user"/></Grid.Column>
            <Grid.Column width={1}><Icon name="fire"/></Grid.Column>
            <Grid.Column width={1}><Icon name="calendar alternate"/></Grid.Column>
            <Grid.Column width={1}><Icon name="percent"/></Grid.Column>
          </Grid.Row>
          {projects}
        </Grid>
      </Tab.Pane> },
    { menuItem: (<Menu.Item style={{padding: '1vh 1vw'}}>Jobs</Menu.Item>), 
      render: () => <Tab.Pane style={{height: '85vh',overflowY:"scroll",backgroundColor:'gainsboro'}}><Grid columns={1}>jobs</Grid></Tab.Pane> },
  ]
  return (
    <aside>
      <div style={{backgroundColor:"white",height:'12.5vh',paddingTop:'3vh'}}>
        <h1 style={{color:"black"}}>agency</h1>
      </div>
      <Tab panes={panes} /> 
    </aside>
  );
}

export default SidebarWrapper;
