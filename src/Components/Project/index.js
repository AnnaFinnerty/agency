import React from 'react';
import '../../App.css';
import { Grid, GridRow } from 'semantic-ui-react';
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
  const percentComplete = 
    <div className='percent-complete-container'>
      <div style={{color:'red',height:props.info.percentComplete+'%'}}></div>
    </div>
  const workers = props.info.workers.map((worker) => {
    return (
      <li key={worker.id}>
        {worker.name}
      </li>
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
          <Grid.Row>Est. months to completion</Grid.Row>
          <Grid.Row>Months left to completion</Grid.Row>
          <Grid.Row>Percent Complete</Grid.Row>
          <Grid.Row>Requirements</Grid.Row>
          <Grid.Row>Employees on Project</Grid.Row>
        </Grid.Column>
        <Grid.Column width={4}>
          <Grid.Row>{props.info.sector}</Grid.Row>
          <Grid.Row>{props.info.type}</Grid.Row>
          <Grid.Row>{budget}</Grid.Row>
          <Grid.Row>{"true"}</Grid.Row>
          <Grid.Row>{props.info.estimatedMonthsToCompletion}</Grid.Row>
          <Grid.Row>{props.info.monthsToCompletion}</Grid.Row>
          <Grid.Row>{props.info.percentComplete}</Grid.Row>
          <Grid.Row>{workers}</Grid.Row>
          {/* <Grid.Row>{requirements}</Grid.Row> */}
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default Project;