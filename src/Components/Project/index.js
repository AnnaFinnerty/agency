import React from 'react';
import {Grid,Icon} from 'semantic-ui-react';

const Projects = (props) => (
  props.projects.map((project) => {
    if(project.accepted || project.considering){
      return(
        <Grid.Row className="hover" columns={4} key={project.id} onClick={()=>props.addPane('project',project)}>
          <Grid.Column width={7}>{project.name}</Grid.Column>
          <Grid.Column width={1}><Icon name={project.accepted ? "check" : "question"}></Icon></Grid.Column>
          <Grid.Column width={1}>{project.workers.length}</Grid.Column>
          <Grid.Column width={1}>{project.productivity}%</Grid.Column>
          <Grid.Column width={1}>{project.monthsToCompletion}</Grid.Column>
          <Grid.Column width={1}>{project.percentComplete}%</Grid.Column>
        </Grid.Row>
      )
    }
  })
)

export default Projects