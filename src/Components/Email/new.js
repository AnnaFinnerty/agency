import React, { Component } from 'react'

import {Modal,Dropdown,Button} from 'semantic-ui-react';

class NewEmailModal extends Component{
    constructor(){
        super()
        this.suggestions = [
            {
                subject:"Hey, let's have a party",
                text: "Work is stressful. Let's have a party and relax a little!",
                cost:100,
                happiness: 10,
            },
            {
                subject:"Happy hour tonight",
                text:"First rounds on me at happy hour. Hope to see you all there!",
                cost:0,
                happiness: 10,
            },
            {
                subject:"Let's be more productive",
                text:"I think we should all try to work harder",
                cost:0,
                happiness: -10,
            }
        ]
    }
    
    render(){
        const suggestionOptions = this.suggestions.map((suggestion,i)=>(
            {
                key: i,
                value: i,
                text: suggestion.subject
            }
        ))
        return(
            <Modal open={this.props.open}>
                <Modal.Header>
                Subject: <Dropdown
                    placeholder='Select Friend'
                    fluid
                    selection
                    options={suggestionOptions}
                />
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