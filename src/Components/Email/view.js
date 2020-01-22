import React from 'react'

import {Modal,Grid, Header,Button} from 'semantic-ui-react';

const ViewEmailModal = (props) => (
    <Modal open={props.open}>
        <Modal.Header>
            {props.email.subject}
            <Button onClick={props.closeEmail} style={{float:'right'}}>
                X
            </Button>
        </Modal.Header>
        <Modal.Content>
        {/* <Grid celled>
            <Grid.Row>
                <Grid.Column></Grid.Column>
                <Grid.Column></Grid.Column>
            </Grid.Row>
        </Grid> */}
        <Header>{props.email.sender.name.email}</Header>
        <Header>to: you@companyname.com</Header>
        <Header>{props.email.time}</Header>
        <Modal.Description>
            {/* <Header>{props.email.sender.name.display}</Header> */}
            {props.email.text}
        </Modal.Description>
        </Modal.Content>
        <h3>reply</h3>
        <br></br>
        <Modal.Actions>
            {
                props.email.considering !== undefined? "" :
                <React.Fragment>
                    <Button >Sure, we'll consider you</Button>
                    <Button >Sorry, maybe another time</Button>
                </React.Fragment>
            }
            {
                props.email.accept !== undefined? "" :
                <React.Fragment>
                    <Button >Accept</Button>
                    <Button >Reject</Button>
                </React.Fragment>
            }
            {
                props.email.accept !== undefined || props.email.considering !== undefined ? '' :
                <React.Fragment>
                    <Button>Reply</Button>
                    <Button>Forward</Button>
                </React.Fragment>
            }
            
        </Modal.Actions>
    </Modal>
)

export default ViewEmailModal