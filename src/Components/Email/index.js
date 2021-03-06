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
      newEmail: false,
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
    this.props.updateCollection('emails','read',emailIndex);
    this.setState({
      currentEmail: emailIndex,
      openEmail: true
    })
  }
  closeEmail = () => {
    this.setState({
      currentEmail: null,
      openEmail: false,
      newEmail: false,
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
             {email.time.hour < 10 ? "0" + email.time.hour + ":00" : email.time.hour + ":00"} {email.time.day}/ {email.time.month}/{email.time.year}
          </Grid.Column>
          <Grid.Column width={1} onClick={()=>this.props.updateCollection('emails','archive',i)}>
            {
              this.state.boxShowing !== 'inbox' ? '' :
              <Icon name="archive"></Icon> 
            } 
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
                          sendEmail={this.props.sendEmail}  
                          addPane={this.props.addPane}
                          acceptProject={this.props.acceptProject}
                          considerProject={this.props.considerProject}
                          // hireApplicant={this.props.hireApplicant}
                          // dismissApplicant={this.props.dismissApplicant}
                          resolveTask={this.props.resolveTask}
                          generateTask={this.props.generateTask}
                          dismissTask={this.props.dismissTask}
                          updateCollection={this.props.updateCollection}
                          />
        }
        {
          !this.state.newEmail ? '':
          <NewEmailModal open={this.state.newEmail} 
                         closeEmail={this.closeEmail}
                        //  sendEmail={this.props.sendEmail}
                         updateCollection={this.props.updateCollection} 
                         />
        }
      </React.Fragment>
    );
  }
}

export default Email;
