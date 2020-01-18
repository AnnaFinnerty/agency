import React, {Component} from 'react';

import {Modal,Grid, Button} from 'semantic-ui-react';

class AgencyModal extends Component{
    constructor(){
        super()
        this.state = {}
    }
//     coh: 100000
// maxSalary: 300000
// monthlyExpenditures: 300000
// monthlyProfit: 100000
// name: "Web Brands"
// yearsInOperation: 1
    render(){
        console.log('agency modal props',this.props)
        return(
            <Modal open={this.props.open} style={{height:'90vh'}}>
                <Modal.Header>
                    {this.props.agency.name}
                    <Button onClick={()=>this.props.closeModal('agencyModalOpen')} style={{float:'right'}}>X</Button>
                </Modal.Header>
                <Modal.Content>
                <Modal.Description>
                    <Grid columns={2}>
                        <Grid.Column>
                            <Grid.Row>Years of Operation:</Grid.Row>
                            <Grid.Row>Cash on Hand:</Grid.Row>
                            <Grid.Row>Monthly Expenses:</Grid.Row>
                            <Grid.Row>Monthly Income:</Grid.Row>
                            <Grid.Row>Active Projects:</Grid.Row>
                            <Grid.Row>Total Employees:</Grid.Row>
                            <Grid.Row>Highest Salary:</Grid.Row>
                            <Grid.Row>Lowest Salary:</Grid.Row>
                            <Grid.Row>Average Salary:</Grid.Row>
                        </Grid.Column>
                        <Grid.Column>
                            <Grid.Row>{this.props.agency.yearsInOperation}</Grid.Row>
                            <Grid.Row>{this.props.agency.coh}</Grid.Row>
                            <Grid.Row>{this.props.agency.monthlyExpenditures}</Grid.Row>
                            <Grid.Row>{this.props.agency.monthlyProfit}</Grid.Row>
                            <Grid.Row>Active Projects:</Grid.Row>
                            <Grid.Row>Total Employees:</Grid.Row>
                            <Grid.Row>{this.props.agency.maxSalary}</Grid.Row>
                            <Grid.Row>Lowest Salary:</Grid.Row>
                            <Grid.Row>Average Salary:</Grid.Row>
                        </Grid.Column>
                    </Grid>
                </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

export default AgencyModal