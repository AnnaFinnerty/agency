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
            <Modal open={this.props.open} style={{height:"50vh"}}>
                <Modal.Header>
                    {this.props.view}
                    <Button onClick={this.props.closeModal} style={{float:'right'}}>
                        X
                    </Button>
                </Modal.Header>
                <Modal.Content style={{height:"40vh"}}>
                    {content}
                </Modal.Content>
                <Modal.Actions style={{textAlign:'center'}}>
                    {/* <span onClick={()=>{this.props.openModal('settings')}} className="fanchor">settings</span> */}
                    <span onClick={()=>{this.props.openModal('instructions')}} className="fanchor">instructions</span>
                    <span onClick={()=>{this.props.openModal('about')}} className="fanchor">about</span>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default AppModal