import React, {Component} from 'react';

import ModalContext from './context';
import ModalWindow from './index';

class ModalProvider extends Component{
  constructor(){
      super();
    //   console.log('modal provider props');

    this.openModal = (type,text,info) => {
        console.log('opening modal in modal provider')
        this.setState({
            open: true,
            type: type,
            text: text,
            info: info
        })
    }

    this.closeModal = () => {
        this.setState({open:false})
    }

    this.state = {
          open: true,
          type: 'popup',
          text: 'this is text test',
          info: null,
          openModal: this.openModal,
          closeModal: this.closeModal
    }
  }
  render(){
    return (
        <ModalContext.Provider value={{open:this.state.open, 
                               closeModal:this.closeModal,
                               openModal:this.openModal, 
                               type:this.state.type, 
                               text: this.state.text,
                               info: this.state.info
                               }}>
            <ModalWindow/>
        </ModalContext.Provider>
      );
  }
}

export default ModalProvider;