import React, { Component } from 'react'

import {Modal,Dropdown,Button} from 'semantic-ui-react';

class NewEmailModal extends Component{
    constructor(){
        super()
        this.state = {
            selected: 0,
        }
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
    onChange = (e,data) => {
        this.setState({
            selected:data.value
        })
    }
    onSubmit = () => {
        this.props.closeEmail();
        const email = {
            subject: this.suggestions[this.state.selected].subject,
            text: this.suggestions[this.state.selected].subject,
            sender: {name:{
                first:"", 
                last: "", 
                full:"me",
                display: "me",
                short: "me",
                email: 'me@'
            }},
            time: 'time',
            sent: true,
            type: 'request',
            subtype: 'money',
            cost: this.suggestions[this.state.selected].cost
        }
        this.props.updateCollection('emails','send',email);
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
            <Modal open={this.props.open} style={{height:'60vh'}}>
                <Modal.Header>
               
                Subject: 
                <Dropdown
                    style={{width:"20vw",display:"inline"}}
                    value={this.state.selected}
                    fluid
                    selection
                    options={suggestionOptions}
                    onChange={this.onChange}
                />
                    <Button onClick={this.props.closeEmail} style={{float:'right'}}>
                        X
                    </Button>
                </Modal.Header>
                <Modal.Content>
                <Modal.Description>
                    {this.suggestions[this.state.selected].text}
                </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.onSubmit}>Send</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default NewEmailModal