import React, {Component} from 'react';

import ModalContext from './context';

import '../../App.css';
import { Modal, Header, Button } from 'semantic-ui-react';

function ModalConsumer(props){
    console.log('modal consumer props', props)
    return (
      <ModalContext.Consumer>
        {({open, closeModal, type, text, info}) => (
          <ModalWindow open={open} closeModal={closeModal} type={type} text={text} info={info} />
        )}
      </ModalContext.Consumer>
    );
}

function ModalWindow(props){
    console.log('modal props', props);
    return (
        <Modal open={props.open}>
            <Modal.Header>Select a Photo
                <Button style={{float:"right"}} onClick={props.closeModal}>X</Button>
            </Modal.Header>
            <Modal.Content>
            <Modal.Description>
                <Header>{props.text}</Header>
                
            </Modal.Description>
            </Modal.Content>
        </Modal>
      );
  
}

export default ModalConsumer;