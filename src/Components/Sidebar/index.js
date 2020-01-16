import React from 'react';

import ModalContext from '../Modal/context'; 
import PersonalIcon from '../Employee/icon';

import '../../App.css';
import { Tab, Grid, Menu } from 'semantic-ui-react'

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
                  employee.projectId.shortName
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
    return(
      <Grid.Row columns={3} key={project.id} onClick={()=>props.addPane('project',project)}>
        <Grid.Column width={12}>{project.name}</Grid.Column>
        <Grid.Column width={2}>{project.monthsToCompletion}</Grid.Column>
        <Grid.Column width={2}>{project.percentComplete}%</Grid.Column>
      </Grid.Row>
    )
  })
  const applicants = props.applicants.map((applicant) => {
    return(
      <Grid.Row columns={2} key={applicant.id}> 
        <Grid.Column onClick={()=>props.addPane('applicant',applicant)}>
        {applicant.name.display}
        </Grid.Column>
        <Grid.Column>
        <button onClick={()=>props.dismissApplicant(applicant.id)} >x</button>
        </Grid.Column>
      </Grid.Row>
    )
  })
  const panes = [
    { menuItem: (<Menu.Item style={{padding: '1vh 1vw'}}>Employees</Menu.Item>), 
      render: () => <Tab.Pane style={{height: '75vh',overflowY:"scroll"}}>{employees}</Tab.Pane> },
    { menuItem: (<Menu.Item style={{padding: '1vh 1vw'}}>Applicants</Menu.Item>), 
      render: () => <Tab.Pane style={{height: '75vh',overflowY:"scroll"}}><Grid columns={1}>{applicants}</Grid></Tab.Pane> },
    { menuItem: (<Menu.Item style={{padding: '1vh 1vw'}}>Projects</Menu.Item>), 
      render: () => <Tab.Pane style={{height: '75vh',overflowY:"scroll"}}><Grid columns={1}>{projects}</Grid></Tab.Pane> },
  ]
  return (
    <aside>
      <Tab panes={panes} /> 
    </aside>
  );
}

export default SidebarWrapper;
