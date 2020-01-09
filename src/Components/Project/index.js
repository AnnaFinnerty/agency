import React from 'react';
import '../../App.css';
import { Grid } from 'semantic-ui-react';
import Helpers from '../../Scripts/Helpers';

function Project(props) {
  console.log('project props',props)
  const helpers = new Helpers();
  const budget = helpers.monify(props.info.budget)
  return (
    <div>
      <h2>{props.info.name}</h2>
      <Grid>
        <Grid.Column width={4}>
          <Grid.Row>Sector</Grid.Row>
          <Grid.Row>Type</Grid.Row>
          <Grid.Row>Budget</Grid.Row>
          <Grid.Row>Budget</Grid.Row>
          <Grid.Row>Requirements</Grid.Row>
        </Grid.Column>
        <Grid.Column width={4}>
          <Grid.Row>{props.info.sector}</Grid.Row>
          <Grid.Row>{props.info.type}</Grid.Row>
          <Grid.Row>{budget}</Grid.Row>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default Project;