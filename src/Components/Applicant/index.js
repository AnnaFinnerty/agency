import React from 'react';

import {Grid} from 'semantic-ui-react';

const Applicants = (props) => (
  props.applicants.map((applicant) => {
    return(
      <Grid.Row className="hover" columns={3} key={applicant.id}> 
        <Grid.Column width={4} onClick={()=>props.addPane('applicant',applicant)}>
        {applicant.name.display}
        </Grid.Column>
        <Grid.Column width={10} onClick={()=>props.addPane('applicant',applicant)}>
          {applicant.skills.map((skill)=><span key={applicant.id+"_"+skill}>{skill}/</span>)}
        </Grid.Column>
        <Grid.Column width={2}>
          <button onClick={()=>props.dismissApplicant(applicant.id)} >x</button>
        </Grid.Column>
      </Grid.Row>
    )
  })
)

export default Applicants