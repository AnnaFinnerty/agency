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
  render(){
    return (
      <React.Fragment>
          <Content testing={this.state.testing}/>
      </React.Fragment>
    );
  }
}

export default App;
