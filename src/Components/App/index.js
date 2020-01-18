import React, {Component} from 'react';

import Content from '../Content';

import '../../App.css';


class App extends Component {
  constructor(){
    super();
    this.state = {
      testing: true,
    }
  }
  //build out login/logout
  render(){
    return (
      <Content testing={this.state.testing}/>
    );
  }
}

export default App;
