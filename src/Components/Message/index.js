import React from 'react';
import {Modal,Button,Icon} from 'semantic-ui-react';

const Message = (props) => (
    <Modal open={props.open} style={{width:'50%'}}>
        <Modal.Content image>
            <Modal.Description style={{width:'50%'}}>
                {props.text}
            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Button onClick={()=>props.closeMessage()}>OK</Button>
        </Modal.Actions>
  </Modal>
)

export default Message