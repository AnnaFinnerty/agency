import React from 'react';
import '../../App.css';
import { Grid, Button } from 'semantic-ui-react';
import Helpers from '../../Scripts/Helpers';

function Project(props) {
  console.log('project props',props)
  const helpers = new Helpers();
  const budget = helpers.monify(props.info.budget)
  // const requirements = props.info.requirements.map((requirement) => {
  //   return (
  //     <li>
  //       {requirement}
  //     </li>
  //   )
  // })
  const workers = props.info.workers.map((worker) => {
    return (
     
        <Button onClick={()=>props.addPane('employee',worker)}key={worker.id}> {worker.name.display}</Button>
  
    )
  })
  return (
    <div>
      <h2>{props.info.name}</h2>
      <Grid>
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
        <Grid.Column width={4}>
          <Grid.Row>Est. months to completion</Grid.Row>
          <Grid.Row>Months left to completion</Grid.Row>
          <Grid.Row>Percent Complete</Grid.Row>
        </Grid.Column>
        <Grid.Column width={4}>
          <Grid.Row>{props.info.estimatedMonthsToCompletion}</Grid.Row>
          <Grid.Row>{props.info.monthsToCompletion}</Grid.Row>
          <Grid.Row>{props.info.percentComplete}</Grid.Row>
        </Grid.Column>
      </Grid>
      <h2>Requirements</h2>
      <Grid columns={2}>
        <Grid.Column width={4}>
          <Grid.Row>Required:</Grid.Row>
        </Grid.Column>
        <Grid.Column width={4}>
          {props.info.requirements.required}
        </Grid.Column>
        <Grid.Column width={4}>
          <Grid.Row>Optional:</Grid.Row>
        </Grid.Column>
        <Grid.Column width={4}>
        {props.info.requirements.optional}
        </Grid.Column>
      </Grid>
      <h2>Personnel</h2>
      {workers}
    </div>
  );
}

export default Project;