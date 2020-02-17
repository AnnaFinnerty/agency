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
        return(
            <Modal open={this.props.open} style={{height:"50vh"}}>
                
            </Modal>
        )
    }
}

export default AppModal