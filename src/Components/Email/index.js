import React, {Component} from 'react';

import ViewEmailModal from './view';
import NewEmailModal from './new';

import '../../App.css';
import{ Container, Grid, Icon, Button } from 'semantic-ui-react';

class Email extends Component{
  constructor(){
    super();
    this.state = {
      boxShowing: 'inbox',
      openEmail: false,
      openNew: false,
      currentEmail: null
    }
  }
  changeVisibleInbox = (type) => {
    this.setState({
      boxShowing: type
    })
  }
  newEmail = () => {
    this.setState({
      currentEmail: null,
      boxShowing: 'inbox',
      openEmail: false,
      newEmail: true
    })
  }
  openEmail = (emailIndex) => {
    this.props.readEmail(emailIndex);
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
    // console.log('emails props',this.props.emails)
    let emails = this.props.emails;
    if(this.state.boxShowing === 'inbox'){
      emails = this.props.emails.filter((email)=> !email.archived )
    } else if (this.state.boxShowing === 'sent'){
      emails = this.props.emails.filter((email)=> email.sent )
    }
    const selectedEmails = !emails.length ? '' : emails.map((email,i)=>{
      return(
        <Grid key={'email_'+i} columns={5} className="hover" style={{height:"5vh",overflow:'hidden'}}>
          <Grid.Column width={1} onClick={()=>this.openEmail(i)}>
            <Icon style={{color:email.read?"gray":"black"}} name="mail"></Icon>
          </Grid.Column>
          <Grid.Column width={3} onClick={()=>this.openEmail(i)}>
            {email.sender.name.display} 
          </Grid.Column>  
          <Grid.Column width={3} onClick={()=>this.openEmail(i)}>
            {email.subject}
          </Grid.Column>
          <Grid.Column width={5} onClick={()=>this.openEmail(i)}>
             {email.text}
          </Grid.Column>
          <Grid.Column width={2}onClick={()=>this.openEmail(i)}>
             {email.time}
          </Grid.Column>
          <Grid.Column width={1} onClick={()=>this.props.archiveEmail(i)}>
            <Icon name="archive"></Icon>  
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
          <Button onClick={()=>this.changeVisibleInbox('inbox')}>inbox</Button>
          <Button onClick={()=>this.changeVisibleInbox('sent')}>sent</Button>
          <Button onClick={()=>this.changeVisibleInbox('all')}>all</Button>
          <hr style={{marginBottom:"5vh"}}></hr>
          {selectedEmails}
        </Container>
        {
          !this.state.currentEmail ? '':
          <ViewEmailModal open={this.state.openEmail} 
                          email={selectedEmail} 
                          closeEmail={this.closeEmail} 
                          addPane={this.props.addPane}
                          acceptProject={this.props.acceptProject}
                          considerProject={this.props.considerProject}
                          />
        }
        {
          !this.state.newEmail ? '':
          <NewEmailModal open={this.state.newEmail} closeEmail={this.closeEmail} />
        }
      </React.Fragment>
    );
  }
}

export default Email;
