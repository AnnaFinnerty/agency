import React, {Component} from 'react';

import EmailModal from './modal';

import '../../App.css';
import{Container} from 'semantic-ui-react';

class Email extends Component{
  constructor(){
    super();
    this.state = {
      openEmail: false,
      currentEmail: null
    }
  }
  openEmail = (emailIndex) => {
    this.setState({
      currentEmail: emailIndex,
      openEmail: true
    })
  }
  closeEmail = () => {
    this.setState({
      currentEmail: null,
      openEmail: false
    })
  }
  render(){
    console.log('email props', this.props)
    const emails = this.props.emails.map((email,i)=>{
      return(
      <li key={i} 
          className="email"
          onClick={()=>this.openEmail(i)}
          > 
        {email.sender.name.display} | 
        {email.subject} |
        {email.time} | 
        {email.text}
      </li>
      )
    })
    const selectedEmail = this.state.openEmail ? this.props.emails[this.state.currentEmail] : "";
    console.log('selected email', this.state.currentEmail)
    return (
      <React.Fragment>
        <Container style={{height:'85vh'}}>
          <h2>Email</h2>
          <ul className='email-list'>
            {emails}
          </ul>
          <div className='email-viewer'>

          </div>
        </Container>
        <EmailModal open={this.state.openEmail} email={selectedEmail} closeEmail={this.closeEmail}/>
      </React.Fragment>
    );
  }
}

export default Email;
