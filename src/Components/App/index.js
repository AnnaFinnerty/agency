import React, {Component} from 'react';

import Content from '../Content';
import AppModal from '../AppModal';

import '../../App.css';


class App extends Component {
  constructor(){
    super();
    this.state = {
      testing: true,
      appModalOpen: true,
      appModalView: "instructions",
      instructionOnOpen: false,
      mobile: window.innerWidth < 800
    }
    window.addEventListener('resize',this.resize)
  }
  resize = () => {
    console.log('resized');
    this.setState({
      mobile: window.innerWidth < 800
    })
  }
  //build out login/logout
  openModal = (view) => {
    console.log('opening modal:'+view)
    this.setState({
      appModalOpen: true,
      appModalView: view ? view : "instructions"
    })
  }
  closeModal = () => {
    this.setState({
      appModalOpen: false,
      appModalView: "instructions"
    })
  }
  render(){
    return (
      <React.Fragment>
        <Content  testing={this.state.testing} 
                  appOpenModal ={this.openModal}
                  mobile={this.state.mobile}
                  />
        <AppModal open={this.state.appModalOpen && this.state.instructionOnOpen} 
                  view={this.state.appModalView} 
                  openModal={this.openModal}
                  closeModal={this.closeModal}
                />
      </React.Fragment>
    );
  }
}

export default App;
