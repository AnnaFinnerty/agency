import React, {Component} from 'react';

import {Modal, Button} from 'semantic-ui-react';

class IndustryModal extends Component{
    constructor(){
        super()
        this.state = {}
    }
    render(){
        return(
            <Modal open={this.props.open} style={{height:'90vh'}}>
                <Modal.Header>
                    Industry
                    <Button onClick={()=>this.props.closeModal('industryModalOpen')} style={{float:'right'}}>X</Button>
                </Modal.Header>
                <Modal.Content>
                <Modal.Description>
                    
                </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

export default IndustryModal