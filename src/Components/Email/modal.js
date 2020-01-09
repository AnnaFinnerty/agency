import React from 'react'

import {Modal,Header,Button} from 'semantic-ui-react';

const EmailModal = (props) => (
    <Modal open={props.open}>
        <Modal.Header>Select a Photo
            <Button onClick={props.closeEmail} style={{float:'right'}}>
                X
            </Button>
        </Modal.Header>
        <Modal.Content image>
        <Modal.Description>
            <Header>Default Profile Image</Header>
            {props.email.text}
        </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Button>Reply</Button>
        </Modal.Actions>
    </Modal>
)

export default EmailModal