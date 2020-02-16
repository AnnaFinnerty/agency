import React, {Component} from 'react';

import {Modal, Header,Button,Icon} from 'semantic-ui-react';
class ViewEmailModal extends Component{
    constructor(){
        super();
        this.state = {
            reply: false,
        }
    }
    considerProject = () => {
        this.props.updateCollection('projects','consider',this.props.email.target)
        this.props.closeEmail();
    }
    acceptProject = () => {
        this.props.updateCollection('projects','accept',this.props.email.target)
        this.props.closeEmail();
    }
    rejectProject = () => {
        this.props.updateCollection('projects','reject',this.props.email.target)
        this.props.closeEmail();
    }
    hireApplicant = () => {
        this.props.updateCollection('applicants','hire',this.props.email.target)
        this.props.closeEmail();
    }
    dismissApplicant = () => {
        this.props.updateCollection('applicants','dismiss',this.props.email.target)
        this.props.closeEmail();
    }
    resolveTask = () => {
        this.props.resolveTask(null,this.props.email);
        this.props.closeEmail();
    }
    generateTask = () => {
        this.props.generateTask(this.props.email.text,this.props.email.sender.level, this.props.email.sender);
        this.props.closeEmail();
    }
    dismissTask = () => {
        this.props.dismissTask(null, this.props.email);
        this.props.closeEmail();
    }
    forward = () => {
        this.props.closeEmail();
        const email = this.props.email;
        email.sent = true;
        email.forward = true;
        this.props.updateCollection('emails','send',email);
    }
    render(){
        console.log('email view props', this.props)
        let actions;
        switch(this.props.email.type){

            case "task":
                actions =
                    <React.Fragment>
                        <Button onClick={this.generateTask}>Yeah, let's do it</Button>
                        <Button onClick={this.dismissTask}>Sorry, maybe another time</Button>
                        <Button onClick={this.dismissTask}><Icon name="mail forward"></Icon></Button>
                    </React.Fragment>
                break

            case "request":
                actions =
                    <React.Fragment>
                        <Button onClick={this.resolveTask}>Sure, no problem</Button>
                        <Button onClick={this.dismissTask}>Sorry, maybe another time</Button>
                        <Button onClick={this.dismissTask}><Icon name="mail forward"></Icon></Button>
                    </React.Fragment>
                break

            case "project":
                actions =
                    <React.Fragment>
                        <Button onClick={this.considerProject}>Sure, we'll consider you</Button>
                        <Button onClick={this.acceptProject}>Yeah, let's do it</Button>
                        <Button onClick={this.rejectProject}>Sorry, maybe another time</Button>
                        <Button onClick={this.forward}><Icon name="mail forward"></Icon></Button>
                    </React.Fragment>
                break

            case "application":
                actions =
                    <React.Fragment>
                        <Button onClick={this.hireApplicant}>You're hired!</Button>
                        <Button onClick={this.dismissApplicant}>Sorry, maybe another time</Button>
                        <Button onClick={this.forward}><Icon name="mail forward"></Icon></Button>
                    </React.Fragment>
                break

            default:
                actions =
                    <React.Fragment>
                        <Button onClick={this.forward}><Icon name="mail forward"></Icon></Button>
                    </React.Fragment>
                break
        }
   
    
    return(
        <Modal open={this.props.open}>
        <Modal.Header>
            {this.props.email.subject}|
            {this.props.email.time.hour < 10 ? "0" + this.props.email.time.hour + ":00" : this.props.email.time.hour + ":00"} {this.props.email.time.day}/ {this.props.email.time.month}/{this.props.email.time.year}
            <Button onClick={this.props.closeEmail} style={{float:'right'}}>
                X
            </Button>
        </Modal.Header>
        <Modal.Content>
        <Header>{this.props.email.sender.name.email}</Header>
        <Header>to: you@companyname.com</Header>
        <Modal.Description>
            {this.props.email.text}
        </Modal.Description>
        </Modal.Content>
        <Modal.Header>Reply</Modal.Header>
        <Modal.Actions>
            {actions}
        </Modal.Actions>
    </Modal>
    )
    }
    
}

export default ViewEmailModal