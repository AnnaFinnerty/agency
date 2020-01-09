import React, {Component} from 'react';

import {Modal, Button} from 'semantic-ui-react';

class AgencyModal extends Component{
    constructor(){
        super()
        this.state = {}
    }
    render(){
        console.log('agency modal props')
        const agency = this.props.agency;
        console.log(agency);
        const name = agency.name;
        console.log(name);
        return(
            <Modal open={this.props.open} style={{height:'90vh'}}>
                <Modal.Header>
                    Agency
                    <Button onClick={()=>this.props.closeModal('agencyModalOpen')} style={{float:'right'}}>X</Button>
                </Modal.Header>
                <Modal.Content>
                <Modal.Description>
                    
                </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

export default AgencyModal