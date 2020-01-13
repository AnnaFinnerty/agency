import React, { Component } from 'react'

import {Modal,Header,Button} from 'semantic-ui-react';

class NewEmailModal extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <Modal open={this.props.open}>
                <Modal.Header>
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