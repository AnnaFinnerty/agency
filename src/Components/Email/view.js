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
        this.props.considerProject(this.props.email.target);
        this.props.closeEmail();
    }
    acceptProject = () => {
        this.props.acceptProject(this.props.email.target);
        this.props.closeEmail();
    }
    hireApplicant = () => {
        this.props.hireApplicant(this.props.email.target);
        this.props.closeEmail();
    }
    dismissApplicant = () => {
        this.props.dismissApplicant(this.props.email.target);
        this.props.closeEmail();
    }
    render(){
        console.log(this.props.email)
        let actions;
        switch(this.props.email.type){
            case "project":
                actions =
                    <React.Fragment>
                        <Button onClick={this.considerProject}>Sure, we'll consider you</Button>
                        <Button onClick={this.acceptProject}>Yeah, let's do it</Button>
                        <Button >Sorry, maybe another time</Button>
                    </React.Fragment>
                break

            case "application":
                actions =
                    <React.Fragment>
                        <Button onClick={this.hireApplicant}>You're hired!</Button>
                        <Button onClick={this.dismissApplicant}>Sorry, maybe another time</Button>
                        <Button ></Button>
                    </React.Fragment>
                break

            default:
                actions =
                    <React.Fragment>
                        <Button><Icon name="reply"></Icon></Button>
                        <Button><Icon name="mail forward"></Icon></Button>
                    </React.Fragment>
                break
        }
   
    
    return(
        <Modal open={this.props.open}>
        <Modal.Header>
            {this.props.email.subject}
            <Button onClick={this.props.closeEmail} style={{float:'right'}}>
                X
            </Button>
        </Modal.Header>
        <Modal.Content>
        <Header>{this.props.email.sender.name.email}</Header>
        <Header>to: you@companyname.com</Header>
        <Header>{this.props.email.time}</Header>
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