import React from 'react';
import '../../App.css';
import { Grid } from 'semantic-ui-react'

function Project(props) {
  console.log('project props',props)
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
          <Grid.Row>{props.info.budget}</Grid.Row>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default Project;