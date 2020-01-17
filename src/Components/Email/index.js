import React, {Component} from 'react';

import ViewEmailModal from './view';
import NewEmailModal from './new';

import '../../App.css';
import{ Container, Grid, Icon, Button } from 'semantic-ui-react';

class Email extends Component{
  constructor(){
    super();
    this.state = {
      emailsShowing: 'inbox',
      openEmail: false,
      openNew: false,
      currentEmail: null
    }
  }
  newEmail = () => {
    this.setState({
      currentEmail: null,
      openEmail: false,
      newEmail: true
    })
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
      openEmail: false,
      openNew: false,
    })
  }
  render(){
    const emails = this.props.emails.map((email,i)=>{
      return(
        <Grid columns={5} onClick={()=>this.openEmail(i)} className="hover" style={{height:"5vh",overflow:'hidden'}}>
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
          <Grid.Column width={5}>
             {email.time}
          </Grid.Column>         
        </Grid> 

      )
    })
    const selectedEmail = this.state.openEmail ? this.props.emails[this.state.currentEmail] : "";
    return (
      <React.Fragment>
        <Container style={{height:'85vh'}}>
          <h2>Email</h2>
          <Button onClick={this.newEmail}>+</Button>
          <Button>inbox</Button>
          <Button>sent</Button>
          <Button>all</Button>
          <hr></hr>
          {emails}
          
        </Container>
        {
          !this.state.currentEmail ? '':
          <ViewEmailModal open={this.state.openEmail} email={selectedEmail} closeEmail={this.closeEmail}/>
        }
        {
          !this.state.newEmail ? '':
          <NewEmailModal open={this.state.newEmail} closeEmail={this.closeEmail}/>
        }
      </React.Fragment>
    );
  }
}

export default Email;
