import React, { Component } from 'react';

import Helpers from '../../Scripts/Helpers';

import '../../App.css';
import { Grid, Button, Label } from 'semantic-ui-react'

function Employee(props) {
  console.log('employee pprops',props);
  const skills = props.info.skillset.skills.map((skill,i) => {
    return(
      <li key = {i}>{skill}</li>
    )
  })
  const helpers = new Helpers();
  const salary = helpers.monify(props.info.salary);
  return (     
      <Grid celled>
        <Grid.Row>
          <Grid.Column width={4}>
            <h2>{props.info.name.full}</h2>
          </Grid.Column>
          <Grid.Column width={4}>
            ID:{props.info.id}
          </Grid.Column>
          <Grid.Column width={4}>
            {
              props.type !== "applicant" ? 
              <Button onClick={()=>props.fireEmployee(props.info.id)}>fire</Button>
              :
              <Button onClick={()=>props.hireApplicant(props.info)}>hire</Button>
            }
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            Productivity:
          </Grid.Column>
          <Grid.Column width={4}>
            {props.info.stats.productivity}
          </Grid.Column>
          <Grid.Column width={4}>
            Happiness
          </Grid.Column>
          <Grid.Column width={4}>
            {props.info.stats.happiness}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            Project:
          </Grid.Column>
          <Grid.Column width={4}>
            {props.info.projectId.name}
          </Grid.Column>
          <Grid.Column width={4}>
            <Button>Switch Project</Button>
          </Grid.Column>
          <Grid.Column width={4}>
           
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            Level:
          </Grid.Column>
          <Grid.Column width={4}>
            {props.info.level}
          </Grid.Column>
          <Grid.Column width={4}>
            <Button>Promote</Button>
          </Grid.Column>
          <Grid.Column width={4}>
            
          </Grid.Column>
        </Grid.Row>
        
        <Grid.Row>
          <Grid.Column width={4}>
            Salary:
          </Grid.Column>
          <Grid.Column width={4}>
            {salary}
          </Grid.Column>
          <Grid.Column width={4}>
            <Button>Raise</Button>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button>Lower</Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            Skills:
          </Grid.Column>
          <Grid.Column width={12}>
            {skills}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          
        </Grid.Row>
      </Grid>
  );
}

export default Employee;