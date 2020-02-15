import React from 'react';

import {VictoryPie } from 'victory';

import '../../App.css';
import { Grid, Dropdown, Button, Icon } from 'semantic-ui-react';
import Helpers from '../../Scripts/Helpers';

function Project(props) {
  console.log('project props',props)
  const removeEmployee = (removedWorker) => {
    console.log('removing employee from project',removedWorker)
    removedWorker.projectId = null;
    removedWorker.project.workers = removedWorker.project.workers.filter((worker)=> worker.id !== removedWorker.id);
    props.updateEmployee(removedWorker);
  }
  const addEmployee = (e,data) => {
    
    const addedEmployee = props.employees[data.value];
    const project = props.info;
    project.workers.push(addedEmployee);
    addedEmployee.projectId = props.info.id;
    addedEmployee.project = project;
    

    console.log('adding employee to project',data.value, addedEmployee)
    props.updateEmployee(addedEmployee);
  }
  const helpers = new Helpers();
  const budget = helpers.monify(props.info.budget)
  const required = props.info.requirements.required.map((requirement,i) => {
    return (
      <li key={'required_'+i}>
        {requirement}
      </li>
    )
  })
  const optional = props.info.requirements.optional.map((requirement,i) => {
    return (
      <li key={'optional_'+i}>
        {requirement}
      </li>
    )
  })
  const workers = props.info.workers.map((worker) => {
    const skills = worker.skills.map((skill,i)=>{
      return(
        <React.Fragment key={worker.id+"_skill_"+i}>
          <Grid.Column width={2}>{skill}</Grid.Column>
          <Grid.Column width={1}>{worker.skillset[skill]}</Grid.Column>
        </React.Fragment>
      )
    })
    return (
      <Grid columns={4} key={worker.id}>
          <Grid.Column width={4} onClick={()=>props.addPane('employee',worker)} className="hover" >{worker.name.display}</Grid.Column>
          {/* skills are returned already in columns */}
          {skills}
          <Grid.Column width={2}>
              <Button onClick={()=>removeEmployee(worker)}>Remove</Button>
          </Grid.Column>
      </Grid>
    )
  })
  const selectableEmployees = props.employees.filter((employee) => employee.level !== 5 && employee.projectId !== props.info.id)
  const employeeOptions = selectableEmployees.map((employee,i)=>{
    return(
      {
        key: employee.id,
        text: employee.name.full + ": " + employee.skilltext,
        value: i
      }
    )
  })
  return (
    <div>
      <h2>{props.info.name}</h2>
      <h3>Status: 
        {props.info.accepted ? "active" : "not accepted"}
        {!props.info.accepted ? 
          <React.Fragment>
            <Button onClick={()=>props.acceptProject(props.info)}>accept</Button>
            <Button onClick={()=>props.rejectProject(props.info.id)}>reject</Button>
          </React.Fragment> 
            : 
          ""
        }
      </h3>
      <Grid>
        <Grid.Column width={5} style={{textAlign:'center'}}>
          Percent Complete
          <VictoryPie
            style={{ parent: { maxWidth: "100%" } }}
            data={[
              { x: " ", y: props.info.percentComplete },
              { x: " ", y: 100-props.info.percentComplete },
            ]}
          />
        </Grid.Column>
        <Grid.Column width={5} style={{textAlign:'center'}}>
          Time Remaining
          <VictoryPie
            style={{ parent: { maxWidth: "100%" } }}
            data={[
              { x: " ", y: props.info.estimatedMonthsToCompletion },
              { x: " ", y: props.info.monthsActive },
            ]}
          />
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column width={4}>
          <Grid.Row>Percent Complete</Grid.Row>
          <Grid.Row>Productivity</Grid.Row>
          <Grid.Row>Client Satisifaction</Grid.Row>
        </Grid.Column>
        <Grid.Column width={1}>
          <Grid.Row>{props.info.percentComplete}</Grid.Row>
          <Grid.Row>{props.info.productivity}%</Grid.Row>
          <Grid.Row>{props.info.satisfaction}%</Grid.Row>
        </Grid.Column>
        <Grid.Column width={4}>
          <Grid.Row>Est. months</Grid.Row>
          <Grid.Row>Months left</Grid.Row>
          <Grid.Row>Budget</Grid.Row>
          <Grid.Row>Paid In Installments?</Grid.Row>
        </Grid.Column>
        <Grid.Column width={1}>
          <Grid.Row>{props.info.estimatedMonthsToCompletion}</Grid.Row>
          <Grid.Row>{props.info.monthsToCompletion}</Grid.Row>
          <Grid.Row>{budget}</Grid.Row>
          <Grid.Row>{props.info.payInInstallments ? 'yes' : 'no'}</Grid.Row>
        </Grid.Column>
      </Grid>
      <h2>Requirements</h2>
      <Grid columns={2}>
        <Grid.Column width={4}>
          <Grid.Row>Sector</Grid.Row>
          <Grid.Row>Required:</Grid.Row>
        </Grid.Column>
        <Grid.Column width={4}>
          <Grid.Row>{props.info.sector}</Grid.Row>
          {required}
        </Grid.Column>
        <Grid.Column width={4}>
          <Grid.Row>Type</Grid.Row>
          <Grid.Row>Optional:</Grid.Row>
        </Grid.Column>
        <Grid.Column width={4}>
        <Grid.Row>{props.info.type}</Grid.Row>
        {optional}
        </Grid.Column>
      </Grid>
      <h2>Personnel</h2>
      <Icon name="user"></Icon>
      <Dropdown
          placeholder='Add Employee'
          fluid
          selection
          options={employeeOptions}
          onChange={addEmployee}
      />
      <Grid columns={1}>
        {workers}
      </Grid>
      {!props.info.accepted ? 
          "" 
            : 
          <Button onClick={()=>props.withdrawProject(props.info.id)}>withdraw from project</Button>
      }
    </div>
  );
}

export default Project;