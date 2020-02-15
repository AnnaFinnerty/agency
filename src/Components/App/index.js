import React, {Component} from 'react';

import Content from '../Content';
import AppModal from '../AppModal';

import '../../App.css';


class App extends Component {
  constructor(){
    super();
    this.state = {
      testing: false,
      appModalOpen: true,
      appModalView: "instructions"
    }
  }
  //build out login/logout
  openModal = (view) => {
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
        <Content testing={this.state.testing} appOpenModal ={this.openModal}/>
        <AppModal open={this.state.appModalOpen && !this.state.testing} 
                  view={this.state.appModalView} 
                  openModal={this.openModal}
                  closeModal={this.closeModal}
                />
      </React.Fragment>
    );
  }
}

export default App;
