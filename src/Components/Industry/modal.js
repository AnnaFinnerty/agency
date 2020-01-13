import React, {Component} from 'react';

import {Modal, Button} from 'semantic-ui-react';

class IndustryModal extends Component{
    constructor(){
        super()
        this.state = {}
    }
    render(){
        console.log('industry props',this.props.industry)
        const clients = this.props.industry.clients.map((client)=>{
            return(
                <div>{client.name}</div>
            )
        })
        const competitors = this.props.industry.competitors.map((competitor)=>{
            return(
                <div>{competitor.name}</div>
            )
        })
        return(
            <Modal open={this.props.open} style={{height:'90vh'}}>
                <Modal.Header>
                    Industry
                    <Button onClick={()=>this.props.closeModal('industryModalOpen')} style={{float:'right'}}>X</Button>
                </Modal.Header>
                <Modal.Content>
                  {clients}
                  {competitors}
                </Modal.Content>
            </Modal>
        )
    }
}

export default IndustryModal