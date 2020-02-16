import React from 'react';


import ModalContext from '../Modal/context';
import Logo from '../Logo';
import Projects from '../Project';
import Applicants from '../Applicant';
import PersonalIcon from '../Employee/icon';

import '../../App.css';
import { Tab, Grid, Menu, Icon } from 'semantic-ui-react'
import Employees from '../Employee';

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
  const panes = [
    { menuItem: (<Menu.Item style={{padding: '1vh 1vw'}}>Employees</Menu.Item>), 
      render: () => <Tab.Pane style={{height: '85vh',overflowY:"scroll",backgroundColor:'gainsboro'}}><Employees employees={props.employees} addPane={props.addPane} updateCollection={props.updateCollection}/></Tab.Pane> },
    { menuItem: (<Menu.Item style={{padding: '1vh 1vw'}}>Applicants</Menu.Item>), 
      render: () => <Tab.Pane style={{height: '85vh',overflowY:"scroll",backgroundColor:'gainsboro'}}>
                        <Grid columns={1}><Applicants applicants={props.applicants} addPane={props.addPane}/> </Grid></Tab.Pane> },
    { menuItem: (<Menu.Item style={{padding: '1vh 1vw'}}>Projects</Menu.Item>), 
      render: () => 
      <Tab.Pane style={{height: '85vh',overflowY:"scroll",backgroundColor:'gainsboro'}}>
        <Grid columns={1}>
          <Grid.Row columns={4} style={{borderBottom:".5px solid dimgray"}}>
            <Grid.Column width={7}></Grid.Column>
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={1}><Icon name="user"/></Grid.Column>
            <Grid.Column width={1}><Icon name="fire"/></Grid.Column>
            <Grid.Column width={1}><Icon name="calendar alternate"/></Grid.Column>
            <Grid.Column width={1}><Icon name="percent"/></Grid.Column>
          </Grid.Row>
          {/* {projects} */}
          <Projects projects={props.projects} addPane={props.addPane}/>
        </Grid>
      </Tab.Pane> },
    // { menuItem: (<Menu.Item style={{padding: '1vh 1vw'}}>Jobs</Menu.Item>), 
    //   render: () => <Tab.Pane style={{height: '85vh',overflowY:"scroll",backgroundColor:'gainsboro'}}><Grid columns={1}>jobs</Grid></Tab.Pane> },
  ]
  return (
    <aside>
      {
        props.mobile ? '' :
        <Logo appOpenModal={props.appOpenModal}/> 
      }
      <Tab panes={panes} /> 
    </aside>
  );
}

export default SidebarWrapper;
