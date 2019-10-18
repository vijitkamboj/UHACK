import React, { Component } from 'react';
import {Modal,Button,Icon,Input,Confirm} from "semantic-ui-react"


class FileModal extends Component {
    state = {
        amount: null,
        isFormEmpty: true,
        open:false
    }


    palceOrder = () => {
        this.props.placeOrder(this.state.amount)
        this.props.closeModal()
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
                amount:event.target.value
            })
        }
    }

    show = () => this.setState({ open: true })
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
                        placeholder='Amount  in Kg...'
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
                    content={`Your Order has been placed and Total bill is ${this.state.amount * this.props.currentProductRate} Rs`}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                />
            </React.Fragment>
        )
    }
}

class StockModal extends Component {
    state = {
        amount: null,
        isFormEmpty: true,
        open:false
    }


    palceOrder = () => {
        this.props.closeModal()
        this.show()
        this.setState({
            stock: ""
        })
    }

    isFormEmpty = (event) => {
        if (event.target.value === "") {
            this.setState({
                isFormEmpty : true
            })
        
        }else{
            this.setState({
                isFormEmpty:false
            })
        }
    }

    show = () => this.setState({ open: true })
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
                    Add Stock
                </Modal.Header>

                <Modal.Content style={{border:"none",fontWeight:"lighter"}}>

                    <Input
                        fluid
                        action={{
                        color: 'teal',
                        labelPosition: 'left',
                        icon: 'cart',
                        content: 'Stock',
                        }}

                        actionPosition='left'
                        placeholder='In sq-mt'
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
                        Add
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
                    content='Your stock has been updated'
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