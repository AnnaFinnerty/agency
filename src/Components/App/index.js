import React, {Component} from 'react';

import Content from '../Content';

import TimerContext from './timerContext';

import '../../App.css';


class App extends Component {
  constructor(){
    super();
    this.state = {
      update: false,
      hour: 0,
      day: 365,
    }
  }
  render(){
    return (
      <React.Fragment>
          <Content/>
      </React.Fragment>
    );
  }
}

export default App;
