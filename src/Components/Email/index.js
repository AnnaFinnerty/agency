import React, {Component} from 'react';

import EmailModal from './view';

import '../../App.css';
import{ Container, Grid, Icon, Button } from 'semantic-ui-react';

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
    const emails = this.props.emails.map((email,i)=>{
      return(
      <li key={i} 
          className="email"
          onClick={()=>this.openEmail(i)}
          >
        <Grid columns={3}>
          <Grid.Column width={1}>
            <Icon name="mail"></Icon>
          </Grid.Column>
          <Grid.Column width={3}>{email.sender.name.display} </Grid.Column>  
          <Grid.Column width={2}>
            {email.subject}
          </Grid.Column>
          <Grid.Column width={5}>
             {email.text}
          </Grid.Column>
          <Grid.Column width={3}>
             {email.time}
          </Grid.Column>         
        </Grid> 
      </li>
      )
    })
    const selectedEmail = this.state.openEmail ? this.props.emails[this.state.currentEmail] : "";
    return (
      <React.Fragment>
        <Container style={{height:'85vh'}}>
          <h2>Email</h2>
          <Button>+</Button>
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
