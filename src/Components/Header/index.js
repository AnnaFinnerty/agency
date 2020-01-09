import React, {Component} from 'react';

import IndustryModal from '../Industry/modal';
import AgencyModal from '../Agency/modal';

import '../../App.css';
import { Grid, Button } from 'semantic-ui-react';

class Header extends Component{
  constructor(){
    super()
    this.state = {
       industryModalOpen: false,
       agencyModalOpen: false,
    }
  }
  openModal = (name) => {
    this.setState({
      [name]: true
    })
  }
  closeModal = (name) => {
    this.setState({
      [name]: false
    })
  }
  render(){
    console.log('header props:', this.props.agency)
    return (
      <React.Fragment>
        <header>
          <nav>
            <Grid celled='internally'>
                <Grid.Column width={5} style={{padding:"0"}}>
                  <h1>agency</h1>
                </Grid.Column>
                <Grid.Column width={3} style={{padding:"0"}}>
                  {/* <h2>{props.agency.name}</h2> */}
                  <Grid.Row>
                    <button onClick={()=>this.openModal('agencyModalOpen')}>A</button>
                    <button onClick={()=>this.openModal('industryModalOpen')}>I</button>
                  </Grid.Row>
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
                      <span>{this.props.hour}</span>/<span>{this.props.day}</span>
                      <Button onClick={this.props.startTimer}>start timer</Button>
                  </Grid.Row>
                  <Grid.Row>
                    <Button size="small" onClick={this.props.stopTimer}>stop timer</Button>
                  </Grid.Row>
                </Grid.Column>     
            </Grid>
          </nav>
      </header>
      <IndustryModal industry={this.props.industry} open={this.state.industryModalOpen} closeModal={this.closeModal} />
      <AgencyModal agency={this.props.agency} open={this.state.agencyModalOpen} closeModal={this.closeModal} />
      </React.Fragment>
    );
  }
}

export default Header;
