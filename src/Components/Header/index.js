import React, {Component} from 'react';

import IndustryModal from '../Industry/modal';
import AgencyModal from '../Agency/modal';
import Helpers from '../../Scripts/Helpers';


import '../../App.css';
import { Grid, Button } from 'semantic-ui-react';

class Header extends Component{
  constructor(){
    super()
    this.state = {
       industryModalOpen: false,
       agencyModalOpen: false,
    }
    this.helpers = new Helpers();
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
    console.log('header props:', this.props)
    const coh = this.helpers.monify(this.props.agency.coh)
    return (
      <React.Fragment>
        <header>
          <nav>
            <Grid celled='internally'>
                <Grid.Column width={5} style={{padding:"0"}}>
                  <h1>agency</h1>
                </Grid.Column>
                <Grid.Column width={3} style={{padding:"0 10px"}}>
                  <h3>{this.props.agency.name}</h3>
                  <h5 style={{marginTop:"0"}}>{this.props.agency.yearsInOperation} years in operation</h5>
                  <Grid.Row>
                    <button onClick={()=>this.openModal('agencyModalOpen')}>agency</button>
                    <button onClick={()=>this.openModal('industryModalOpen')}>industry</button>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column width={2} style={{padding:"0"}}>
                  <Grid.Row>$</Grid.Row>
                  
                  <Grid.Row>Emp.Productivity</Grid.Row>
                  <Grid.Row>Emp.Happiness</Grid.Row>
                </Grid.Column>
                <Grid.Column width={2} style={{padding:"0"}}>
                  <Grid.Row>{coh}</Grid.Row>
                  <Grid.Row>{this.props.employeeStats.productivity}%</Grid.Row>
                  <Grid.Row>{this.props.employeeStats.happiness}%</Grid.Row>
                </Grid.Column>
                <Grid.Column width={2} style={{padding:"0"}}>
                </Grid.Column>
                <Grid.Column width={2} style={{padding:"0"}}>
                  <Grid.Row>
                      <span>{this.props.hour}</span>
                  </Grid.Row>
                  <Grid.Row>
                      <span>{this.props.day}</span>/<span>{this.props.month}</span>
                  </Grid.Row>
                  <Grid.Row>
                    {
                      this.props.timeRunning ? 
                      <Button size="small" onClick={this.props.stopTimer}>stop timer</Button>
                      :
                      <Button onClick={this.props.startTimer}>start timer</Button>
                    }
                  </Grid.Row>
                </Grid.Column>     
            </Grid>
          </nav>
      </header>
      {
        !this.state.industryModalOpen ? '' :
        <IndustryModal industry={this.props.industry} open={this.state.industryModalOpen} closeModal={this.closeModal} />
      }
      {
        !this.state.agencyModalOpen ? '' :
        <AgencyModal agency={this.props.agency} open={this.state.agencyModalOpen} closeModal={this.closeModal} />
      }
      </React.Fragment>
    );
  }
}

export default Header;
