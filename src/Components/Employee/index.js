import React from 'react';
import '../../App.css';
import { Grid, Label } from 'semantic-ui-react'

function Employee(props) {
  console.log('employee pprops',props);
  const skills = props.info.skillset.skills.map((skill,i) => {
    return(
      <li key = {i}>{skill}</li>
    )
  })
  return (
    <div>
      <h2>{props.info.name.full}</h2>
      {
        props.type != "applicant" ? 
        <button onClick={()=>props.fireEmployee(props.info.id)}>fire</button>
        :
        <button onClick={()=>props.hireApplicant(props.info)}>hire</button>
      }
      <Grid celled>
        <Grid.Row>
          <Grid.Column width={4}>
            ID:
          </Grid.Column>
          <Grid.Column width={4}>
            {props.info.id}
          </Grid.Column>
          <Grid.Column width={4}>
            <Label>Level:</Label>
          </Grid.Column>
          <Grid.Column width={4}>
            {props.info.level}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            Salary:
          </Grid.Column>
          <Grid.Column width={4}>
            {props.info.salary}
          </Grid.Column>
          <Grid.Column width={4}>
            <Label>Level:</Label>
          </Grid.Column>
          <Grid.Column width={4}>
            {props.info.level}
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
    </div>
  );
}

export default Employee;