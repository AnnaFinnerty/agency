import React, {Component} from 'react';
import EmailContext from './context';
import Email from '.';


class EmailProvider extends Component{
  constructor(){
    super();
    this.state = {
      emails: ["Hey it's a test email"]
    }
    this.addEmail = (newEmail) => {
      this.setState(state => ({
        emails: [newEmail, ...this.state.emails]
      }));
    }
    this.deleteEmail = (emailToDelete) => {

    }
  }
  render(){
    // console.log('email provider props', this.props)
    return (
      <EmailContext.Provider value={{emails:this.state.emails,addEmail:this.addEmail}}>
        <Email />
      </EmailContext.Provider>
    );
  }
}

export default EmailProvider;
