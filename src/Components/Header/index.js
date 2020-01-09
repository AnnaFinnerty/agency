import React from 'react';
import '../../App.css';
import { Grid, Button } from 'semantic-ui-react'

function Header(props) {
  console.log('header props:', props.agency)
  return (
    <header>
        <nav>
          <Grid celled='internally'>
              <Grid.Column width={5} style={{padding:"0"}}>
                <h1>agency</h1>
              </Grid.Column>
              <Grid.Column width={3} style={{padding:"0"}}>
                {/* <h2>{props.agency.name}</h2> */}
              </Grid.Column>
              <Grid.Column width={2} style={{padding:"0"}}>
                Monthly Income
                Monthly Expenditures
              </Grid.Column>
              <Grid.Column width={2} style={{padding:"0"}}>
              </Grid.Column>
              <Grid.Column width={2} style={{padding:"0"}}>
              </Grid.Column>
              <Grid.Column width={2} style={{padding:"0"}}>
                <Grid.Row>
                    <span>{props.hour}</span>/<span>{props.day}</span>
                    <Button onClick={props.startTimer}>start timer</Button>
                </Grid.Row>
                <Grid.Row>
                  <Button size="small" onClick={props.stopTimer}>stop timer</Button>
                </Grid.Row>
              </Grid.Column>     
          </Grid>
        </nav>
    </header>
  );
}

export default Header;
