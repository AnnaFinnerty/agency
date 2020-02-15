import React, { Component } from 'react';

import PersonalIcon from './icon';
import Helpers from '../../Scripts/Helpers';
import ProjectOptions from '../Project/options.js';

import '../../App.css';
import { Grid, Button} from 'semantic-ui-react'

class Employee extends Component {
  constructor(){
    super()
  }
  raiseSalary = () => {
    const updatedEmployee = this.props.info;
    updatedEmployee.raiseSalary();
    this.props.updateEmployee(updatedEmployee);
  }
  lowerSalary = () => {
    const updatedEmployee = this.props.info;
    updatedEmployee.lowerSalary();
    this.props.updateEmployee(updatedEmployee);
  }
  promote = () => {
    const updatedEmployee = this.props.info;
    updatedEmployee.promote();
    this.props.updateEmployeeLevel(updatedEmployee);
  }
  demote = () => {
    const updatedEmployee = this.props.info;
    updatedEmployee.demote();
    this.props.updateEmployeeLevel(updatedEmployee);
  }
  changeProject = (e,data) => {
    console.log('changing project to:', data.value);
    const newProject = this.props.projects[data.value];
    const updatedEmployee = this.props.info;
    //MTC change to run off employee method that also updates id
    updatedEmployee.project = newProject ? newProject : null;
    updatedEmployee.projectId = newProject ? newProject.id : null;
    this.props.updateEmployeeLevel(updatedEmployee);
  }

  render(){
    console.log('employee pprops',this.props);
    const skills = this.props.info.skills.map((skill,i) => {
      return(
        <li key = {i}>{skill}</li>
      )
    })
  const helpers = new Helpers();
  const salary = helpers.monify(this.props.info.salary);
  
                                                                                        const skillScores = this.props.info.skills.map((skill,i)=>{
    return <li key={'skill_'+i}>{this.props.info.skillset[skill]}</li>
  })
  return (     
      <Grid celled>
        <Grid.Row>
          <Grid.Column width={4}>
            <h2>
              <PersonalIcon icon={this.props.info.icon}/>
              {this.props.info.name.full}</h2>
          </Grid.Column>
          <Grid.Column width={4}>
            {this.props.info.title}
          </Grid.Column>
          <Grid.Column width={4}>
            ID:{this.props.info.id}
          </Grid.Column>
          <Grid.Column width={4}>
            {
              this.props.info.level === 5 ? '' :
              this.props.type !== "applicant" ? 
              <Button onClick={()=>this.props.fireEmployee(this.props.info.id)}>fire</Button>
              :
              <Button onClick={()=>this.props.hireApplicant(this.props.info)}>hire</Button>
            }
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            Productivity:
          </Grid.Column>
          <Grid.Column width={4}>
            {this.props.info.stats.productivity}
          </Grid.Column>
          <Grid.Column width={4}>
            Happiness
          </Grid.Column>
          <Grid.Column width={4}>
            {this.props.info.stats.happiness}
          </Grid.Column>
        </Grid.Row>
        {
          this.props.info.level === 5 || this.props.type === 'applicant' ? '' :
          <Grid.Row>
            <Grid.Column width={4}>
              Project: {this.props.info.projectId ? this.props.info.project.name : "unassigned"}
            </Grid.Column>
            <Grid.Column width={4}>
              Match: {this.props.info.projectId ? this.props.info.match : "n/a"}
            </Grid.Column>
            <Grid.Column width={4}>
              Change Project:
            </Grid.Column>
            <Grid.Column width={4}>
              <ProjectOptions projects={this.props.projects}
                              changeProject={this.changeProject}
              />
            </Grid.Column>
          </Grid.Row>
        }
        <Grid.Row>
          <Grid.Column width={4}>
            Level:
          </Grid.Column>
          <Grid.Column width={4}>
            {this.props.info.level}
          </Grid.Column>
          <Grid.Column width={4}>
            {
              this.props.type === 'applicant'||this.props.info.level === 5 ? '' :
              <Button onClick={this.promote}>Promote</Button>
            }
          </Grid.Column>
          <Grid.Column width={4}>
            {
              this.props.type === 'applicant'||this.props.info.level === 5 ? '' :
              <Button onClick={this.demote}>Demote</Button>
            }
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
            {
              this.props.type === 'applicant'||this.props.info.level === 5 ? '' :
              <Button onClick={this.raiseSalary}>Raise</Button>
            }
           
          </Grid.Column>
          <Grid.Column width={4}>
            {
              this.props.type === 'applicant'||this.props.info.level === 5 ? '' :
              <Button onClick={this.lowerSalary}>Lower</Button>
            }
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            Skills:
          </Grid.Column>
          <Grid.Column width={4}>
            {skills}
          </Grid.Column>
          <Grid.Column width={4}>
            {skillScores}
          </Grid.Column>
          <Grid.Column width={4}></Grid.Column>
        </Grid.Row>
        <Grid.Row>
        </Grid.Row>
      </Grid>
  );
  }
}

export default Employee;