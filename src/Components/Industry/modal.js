import React, {Component} from 'react';

import {Modal, Grid,Card, Button,Icon} from 'semantic-ui-react';

class IndustryModal extends Component{
    constructor(){
        super()
        this.state = {}
    }
    render(){
        console.log('industry props',this.props.industry)
        const clients = this.props.industry.clients.map((client)=>{
            return(
                <Card>
                    <Card.Content>
                        <Card.Header>{client.name}</Card.Header>
                        <Card.Description>
                            Rep: {client.rep.name.full}
                        </Card.Description>
                    </Card.Content>
                </Card>
            )
        })
        const competitors = this.props.industry.competitors.map((competitor)=>{
            return(
                <Card>
                    <Card.Content>
                        <Card.Header>{competitor.name}</Card.Header>
                        <Card.Description>
                            
                        </Card.Description>
                    </Card.Content>
                </Card>
            )
        })
        return(
            <Modal open={this.props.open} style={{height:'90vh'}}>
                <Modal.Header>
                    Industry
                    <Button onClick={()=>this.props.closeModal('industryModalOpen')} style={{float:'right'}}>X</Button>
                </Modal.Header>
                <Modal.Content>
                    <Grid columns={2}>
                        <Grid.Column width={8}>
                            <Grid.Row>clients</Grid.Row>
                            {clients}
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Grid.Row>competitors</Grid.Row>
                            {competitors}
                        </Grid.Column>
                    </Grid>
                </Modal.Content>
            </Modal>
        )
    }
}

export default IndustryModal