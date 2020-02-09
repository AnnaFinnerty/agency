import React, {Component} from 'react';

import {Modal, Header,Button} from 'semantic-ui-react';
class ViewEmailModal extends Component{
    constructor(){
        super();
        this.state = {

        }
    }
    render(){
        console.log(this.props.email)
        let actions;
        switch(this.props.email.type){
            case "project":
                actions =
                    <React.Fragment>
                        <Button onClick={()=>this.props.considerProject(this.props.email.target)}>Sure, we'll consider you</Button>
                        <Button onClick={()=>this.props.acceptProject(this.props.email.target)}>Yeah, let's do it</Button>
                        <Button >Sorry, maybe another time</Button>
                    </React.Fragment>
                break

            case "application":
                actions =
                    <React.Fragment>
                        <Button onClick={()=>this.props.considerProject(this.props.email.target)}>Sure, we'll consider you</Button>
                        <Button onClick={()=>this.props.acceptProject(this.props.email.target)}>Yeah, let's do it</Button>
                        <Button >Sorry, maybe another time</Button>
                    </React.Fragment>
                break

            default:
                actions =
                    <React.Fragment>
                        <Button>Reply</Button>
                        <Button>Forward</Button>
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