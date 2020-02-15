import React, {Component} from 'react';

import Instructions from './instructions';
import About from './about';
import Settings from './settings';
import New from './new';
import Login from './login';

import {Modal,Button} from 'semantic-ui-react';

class AppModal extends Component{
    constructor(){
        super()
    }
    
    render(){
        let content;
        switch(this.props.view){

            case "new":
                content = <New />
                break

            case "settings":
                content = <Settings />
                break

            case "about":
                content = <About />
                break

            default:
                content = <Instructions />

        }
        return(
            <Modal open={this.props.open}>
                <Modal.Header>
                    Instructions
                    <Button onClick={this.props.closeModal} style={{float:'right'}}>
                        X
                    </Button>
                </Modal.Header>
                <Modal.Content>
                    {content}
                    <span>about</span>
                </Modal.Content>
            </Modal>
        )
    }
}

export default AppModal