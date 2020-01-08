import React from 'react';

import ModalContext from '../Modal/context'; 

import '../../App.css';
import { Tab } from 'semantic-ui-react'

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
  const click = () => {
    console.log('click');
  }
  const employees = props.employees.map((employee) => {
    return(
      <li key={employee.id} onClick={()=>props.addPane('employee',employee)}>
        {employee.name.display}
        {
          employee.level === 2 ? "*" : ""
        }
      </li>
    )
  })
  const projects = props.projects.map((project) => {
    return(
      <li key={project.id} onClick={()=>props.addPane('project',project)}>
        {project.name}
      </li>
    )
  })
  const applicants = props.applicants.map((applicant) => {
    return(
      <li key={applicant.id} onClick={()=>props.addPane('applicant',applicant)}>
        {applicant.name.display}
      </li>
    )
  })
  const panes = [
    { menuItem: 'Employees', render: () => <Tab.Pane>{employees}</Tab.Pane> },
    { menuItem: 'Applicants', render: () => <Tab.Pane>{applicants}</Tab.Pane> },
    { menuItem: 'Projects', render: () => <Tab.Pane>{projects}</Tab.Pane> },
  ]
  return (
    <aside>
      <Tab panes={panes} /> 
    </aside>
  );
}

export default SidebarWrapper;
