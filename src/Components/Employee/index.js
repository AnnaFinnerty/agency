import React from 'react';

import PersonalIcon from './icon';
import {Grid} from 'semantic-ui-react';

const Employees = (props) => (
  props.employees.map((employee) => {
    return(
      <div key={employee.id} className="hover">
        <Grid celled onClick={()=>props.addPane('employee',employee)}>
          <Grid.Row columns={3}  style={{padding:'0'}}>
              <Grid.Column width={6} style={{display:"flex"}}>
                <PersonalIcon icon={employee.icon}/>
                {employee.name.display}
                {
                  employee.level === 5 ? "*" : ""
                }
              </Grid.Column>
              <Grid.Column width={7}>
                {employee.title}
              </Grid.Column>
              <Grid.Column width={1}>
                {employee.level}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3} style={{padding:'0'}}>
              <Grid.Column width={10}>
                {
                  !employee.projectId ? '' :
                  employee.project.shortName
                }
              </Grid.Column>
              <Grid.Column width={2}>
                {employee.onVacation ? '0': employee.stats.productivity}%
              </Grid.Column>
              <Grid.Column width={1}>
                {employee.stats.happiness}
              </Grid.Column>
          </Grid.Row>
      </Grid>
      </div>
    )
  })
)

export default Employees