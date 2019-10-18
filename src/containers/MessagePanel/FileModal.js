import React, { Component } from 'react';
import {Modal,Button,Icon,Input,Confirm,Message} from "semantic-ui-react"


class FileModal extends Component {
    state = {
        amount: "",
        isFormEmpty: true,
        open:false,
        error:false
    }
    


    palceOrder = () => {
            this.props.placeOrder(this.state.amount)
            this.show()
    }

    isFormEmpty = (event) => {
        if (event.target.value === "") {
            this.setState({
                isFormEmpty : true
            })
        
        }else{
            this.setState({
                isFormEmpty:false,
                amount:Number(event.target.value),
                currentProductRate: Number(this.props.currentProductRate)
            })
        }
    }

    show = () => this.setState({ open: true },()=>{this.props.closeModal()})
    handleConfirm = () => this.setState({ open: false })
    handleCancel = () => this.setState({ open: false })

    render(){
        return(
            <React.Fragment>
                <Modal basic open={this.props.modal} closeIcon onClose={this.props.closeModal} onKeyDown={this.handleEnter}>

                <Modal.Header 
                    icon="add" 
                    style={{
                        fontWeight:"lighter",
                        color: "rgb(226, 226, 226)",
                        border:"none",
                    }}
                >
                    Place order
                </Modal.Header>

                <Modal.Content style={{border:"none",fontWeight:"lighter"}}>

                    <Input
                        fluid
                        action={{
                        color: 'teal',
                        labelPosition: 'left',
                        icon: 'cart',
                        content: 'Checkout',
                        }}

                        actionPosition='left'
                        placeholder='In sq-mt...'
                        onChange = {this.isFormEmpty}
                    />

                </Modal.Content>

                <Modal.Actions style={{border:"none"}}>

                    <Button 
                        color="green" 
                        basic 
                        inverted 
                        onClick={this.palceOrder} 
                        disabled={this.state.isFormEmpty}
                    >
                        <Icon name="shopping basket"/>
                        Buy
                    </Button>

                    <Button 
                        color="red" 
                        basic 
                        inverted 
                        onClick={this.props.closeModal}
                    >
                        <Icon name="remove" />
                        Cancel
                    </Button>

                </Modal.Actions>
                </Modal>
                <Confirm
                    open={this.state.open}
                    content={`Your Order has been placed and Total bill is ${this.state.amount * this.state.currentProductRate} Rs`}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                />
            </React.Fragment>
        )
    }
}

class StockModal extends Component {
    state = {
        amount: "",
        isFormEmpty: true,
        open:false,
    }
    


    palceOrder = () => {
        this.props.placeOrder(this.state.amount)
        this.show()
    }

    isFormEmpty = (event) => {
        if (event.target.value === "") {
            this.setState({
                isFormEmpty : true
            })
        
        }else{
            this.setState({
                isFormEmpty:false,
                amount:Number(event.target.value),
                currentProductName: this.props.currentProduct.orderName,
                currentProductStock: this.props.currentProduct.stock
            })
        }
    }

    show = () => this.setState({ open: true },()=>{this.props.closeModal()})
    handleConfirm = () => this.setState({ open: false })
    handleCancel = () => this.setState({ open: false })

    render(){
        return(
            <React.Fragment>
                <Modal basic open={this.props.modal} closeIcon onClose={this.props.closeModal} onKeyDown={this.handleEnter}>

                <Modal.Header 
                    icon="add" 
                    style={{
                        fontWeight:"lighter",
                        color: "rgb(226, 226, 226)",
                        border:"none",
                    }}
                >
                    Stock Update
                </Modal.Header>

                <Modal.Content style={{border:"none",fontWeight:"lighter"}}>

                    <Input
                        fluid
                        action={{
                        color: 'teal',
                        labelPosition: 'left',
                        icon: 'cart',
                        content: 'Amount',
                        }}

                        actionPosition='left'
                        placeholder='In sq-mt...'
                        onChange = {this.isFormEmpty}
                    />

                </Modal.Content>

                <Modal.Actions style={{border:"none"}}>

                    <Button 
                        color="green" 
                        basic 
                        inverted 
                        onClick={this.palceOrder} 
                        disabled={this.state.isFormEmpty}
                    >
                        <Icon name="shopping basket"/>
                        Add Stock
                    </Button>

                    <Button 
                        color="red" 
                        basic 
                        inverted 
                        onClick={this.props.closeModal}
                    >
                        <Icon name="remove" />
                        Cancel
                    </Button>

                </Modal.Actions>
                </Modal>
                <Confirm
                    open={this.state.open}
                    content={`Your Stock has been updated and your current stock for ${this.state.currentProductName} is ${ Number(this.state.amount) + Number(this.state.currentProductStock)}`}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                />
            </React.Fragment>
        )
    }
}


export {
    FileModal,
    StockModal
}