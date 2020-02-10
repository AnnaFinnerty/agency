import React, { Component } from 'react'

import {Modal,Button} from 'semantic-ui-react';

class NewEmailModal extends Component{
    constructor(){
        super()
        this.suggestions = ["First round's on me at happy hour", "Hey, let's have a party to celebrate our success!"]
    }
    render(){
        return(
            <Modal open={this.props.open}>
                <Modal.Header>
                    Subject
                    <Button onClick={this.props.closeEmail} style={{float:'right'}}>
                        X
                    </Button>
                </Modal.Header>
                <Modal.Content>
                <Modal.Description>
                    
                </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button>Reply</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default NewEmailModal