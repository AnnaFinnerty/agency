import React from 'react';
import '../../App.css';
import { Grid, Button } from 'semantic-ui-react';
import Helpers from '../../Scripts/Helpers';

function Project(props) {
  console.log('project props',props)
  const removeEmployee = (removedWorker) => {
    console.log('removing employee from project')
    removedWorker.projectId = null;
    removedWorker.project.workers = removedWorker.project.workers.filter((worker)=> worker.id !== removedWorker.id);
    props.updateEmployee('employee', removedWorker);
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
          <Button onClick={()=>props.withdrawProject(props.info.id)}>withdraw</Button>}
      </h3>
      <Grid>
        <Grid.Column width={4}>
          <Grid.Row>Est. months</Grid.Row>
          <Grid.Row>Months left</Grid.Row>
          <Grid.Row>Percent Complete</Grid.Row>
          <Grid.Row>Productivity</Grid.Row>
        </Grid.Column>
        <Grid.Column width={4}>
          <Grid.Row>{props.info.estimatedMonthsToCompletion}</Grid.Row>
          <Grid.Row>{props.info.monthsToCompletion}</Grid.Row>
          <Grid.Row>{props.info.percentComplete}</Grid.Row>
          <Grid.Row>{props.info.productivity}%</Grid.Row>
        </Grid.Column>
        <Grid.Column width={4}>
          <Grid.Row>Sector</Grid.Row>
          <Grid.Row>Type</Grid.Row>
          <Grid.Row>Budget</Grid.Row>
          <Grid.Row>Paid In Installments?</Grid.Row>
        </Grid.Column>
        <Grid.Column width={4}>
          <Grid.Row>{props.info.sector}</Grid.Row>
          <Grid.Row>{props.info.type}</Grid.Row>
          <Grid.Row>{budget}</Grid.Row>
          <Grid.Row>{props.info.payInInstallments ? 'yes' : 'no'}</Grid.Row>
        </Grid.Column>
        
      </Grid>
      <h2>Requirements</h2>
      <Grid columns={2}>
        <Grid.Column width={4}>
          <Grid.Row>Required:</Grid.Row>
        </Grid.Column>
        <Grid.Column width={4}>
          {required}
        </Grid.Column>
        <Grid.Column width={4}>
          <Grid.Row>Optional:</Grid.Row>
        </Grid.Column>
        <Grid.Column width={4}>
        {optional}
        </Grid.Column>
      </Grid>
      <h2>Personnel</h2>
      <Grid columns={1}>
        {workers}
      </Grid>
    </div>
  );
}

export default Project;