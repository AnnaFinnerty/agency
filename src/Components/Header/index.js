import React, {Component} from 'react';

import IndustryModal from '../Industry/modal';
import AgencyModal from '../Agency/modal';
import Helpers from '../../Scripts/Helpers';


import '../../App.css';
import { Grid, Button, Icon } from 'semantic-ui-react';

class Header extends Component{
  constructor(){
    super()
    this.state = {
       industryModalOpen: false,
       agencyModalOpen: false,
       fullscreen: false,
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
  openFull = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE */
      elem.msRequestFullscreen();
    }
    this.setState({
      fullscreen: true
    })
  }
  closeFull = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE */
      document.msExitFullscreen();
    }
    this.setState({
      fullscreen: false
    })
  }
  render(){
    // console.log('header props:', this.props)
    const coh = this.helpers.monify(this.props.agency.coh)
    const profit = this.helpers.monify(this.props.agency.monthlyProfit);
    const loss = this.helpers.monify(this.props.agency.monthlyExpenditures)
    return (
      <React.Fragment>
        <header>
          <nav>
            <Grid celled='internally'>
                <Grid.Column width={5} style={{padding:"0 10px"}}>
                  <h3>{this.props.agency.name}</h3>
                  <h5 style={{marginTop:"0"}}>{this.props.agency.yearsInOperation} years in operation</h5>
                  <Grid.Row>
                    <button onClick={()=>this.openModal('agencyModalOpen')}>agency</button>
                    <button onClick={()=>this.openModal('industryModalOpen')}>industry</button>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column width={3} style={{padding:"0"}}>
                  <Grid.Row>Cash on Hand</Grid.Row>
                  <Grid.Row>Income/Month</Grid.Row>
                  <Grid.Row>Loss/Month</Grid.Row>
                  <Grid.Row>Emp.Productivity</Grid.Row>
                  <Grid.Row>Emp.Happiness</Grid.Row>
                </Grid.Column>
                <Grid.Column width={3} style={{padding:"0"}}>
                  <Grid.Row>{coh}</Grid.Row>
                  <Grid.Row>{profit}</Grid.Row>
                  <Grid.Row>{loss}</Grid.Row>
                  <Grid.Row>{this.props.employeeStats.productivity}%</Grid.Row>
                  <Grid.Row>{this.props.employeeStats.happiness}%</Grid.Row>
                </Grid.Column>
                
                <Grid.Column width={3} style={{padding:"0"}}>
                  <Grid.Row>
                      <span>{this.props.hour < 10 ? "0" + this.props.hour + ":00" : this.props.hour + ":00"}</span>
                  </Grid.Row>
                  <Grid.Row>
                    <span>{this.props.month}</span>/<span>{this.props.day}</span>/<span>{this.props.startYear+this.props.year}</span>
                  </Grid.Row>
                  <Grid.Row >
                    {
                      !this.props.timeRunning ? 
                      <Button color="green" size="small" style={{padding:"10%"}} onClick={this.props.startTimer}><Icon name="play"></Icon></Button>
                      :
                      <Button onClick={this.props.stopTimer} style={{padding:"10%"}}><Icon color="red" name="stop"></Icon></Button>
                    }
                    {
                      !this.state.fullscreen ?
                      <Button onClick={this.openFull} style={{padding:"10%"}}><Icon name="window maximize outline"></Icon></Button>
                      :
                      <Button onClick={this.closeFull} style={{padding:"10%"}}><Icon name="window restore outline"></Icon></Button>
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
