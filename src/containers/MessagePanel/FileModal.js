import React, { Component } from 'react';
import {Modal,Button,Icon,Input} from "semantic-ui-react"
import mime from "mime-types"

class FileModal extends Component {
    state = {
        amount: null,
        isFormEmpty: true,
    }


    palceOrder = () => {
        const {file} = this.state
        this.props.closeModal()
        this.setState({
            amount: ""
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

    render(){
        return(
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
        )
    }
}


export default FileModal