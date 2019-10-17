import "./MessagePanel.css"
import React, { Component } from 'react';

import MessagesHeader from "./MessagesHeader";
import FileModal from "./FileModal";

import {Segment,Comment,Card,Icon,Image,Button} from "semantic-ui-react";
import firebase from "../../firebase";
import moment from "moment"

class MessagePanel extends Component{

    state = {
        messagesRef: firebase.database().ref("supply"),
        messages: [],
        messagesLoading:true,
        modal : false
    } // initial state - message segment will be loading 

    componentDidMount() {
        this.scrollBottom()
        setTimeout(() => {
            const {currentUser} = this.props;

            if (currentUser) {
                this.addListeners()
            }
        }, 1900)

    } // when component has mounted , adding listeners on channel but after a
     //delay of 1.9s so as to wait for (channel component to succefully mount so that firstChannel can be stored on global state)  

    componentWillUnmount(){
        this.state.messagesRef.off("child_added")
    } // removing the listeners befire component unmounts


    addListeners = () => {
        this.addMessageListener()
    }// method to add listeners


    addMessageListener = () => {
        let loadedMessages = []
        this.state.messagesRef.on("child_added", snap => {
            loadedMessages.push(snap.val())
            this.setState({
                messages: loadedMessages,
                messagesLoading: false
            })
            
        })
    }// Message Listener


    isImage = (message) => {
        return message.hasOwnProperty('image') && ! message.hasOwnProperty('content')
    } // method to check wheather message is a image or not

    handleShop = () => {
        this.setState({modal : true})
    }

    closeModal = () => {
        this.setState({modal:false})
    }

    displayStock = (messages) => {
        if(messages.length>0){
            return(
                <React.Fragment>
                    {messages.map (message => 
                        {
                            return(
                                <div key = {message.id}>
                                    <Card style={{margin:"8px", marginRight: "20px"}}>
                                        <Image src='https://5.imimg.com/data5/DW/WO/MY-9563002/plain-cotton-fabric-500x500.png' wrapped ui={false} />
                                        <Card.Content>
                                            <Card.Header>{message.orderName}</Card.Header>

                                            <Card.Meta>
                                                <span className='date'>{message.rate}</span>Rs/Kg
                                            </Card.Meta>

                                            <Card.Description>
                                                {message.orderDetail}
                                            </Card.Description>

                                            </Card.Content>

                                            <Card.Content extra>
                                            <span>
                                                <Icon name='shopping bag' />
                                                {message.weightOfOrder} Kg available
                                            </span>
                                            <Button style={{marginLeft:"60px"}} animated='vertical' onClick={this.handleShop} >
                                                <Button.Content hidden>Shop</Button.Content>
                                                <Button.Content visible>
                                                    <Icon name='shop' />
                                                </Button.Content>
                                            </Button>
                                        </Card.Content>
                                    </Card>
                                </div>
                            )
                        }
                    )}
                </React.Fragment>
            )
        }
    } // method to display messages

    render(){
        const {messages,messagesLoading} = this.state;
        const{currentUser} = this.props
        return(
            <div id="message-panel" className="panels" >
                <FileModal modal = {this.state.modal} closeModal={this.closeModal}/>
                <MessagesHeader/>

                <Segment 
                    loading={messagesLoading}
                    style={{flex:"1", width:"95%" , margin:"10px auto 0px auto" , overflowY:"scroll"}}
                >
                    <Comment.Group id = "message-panel-segment" style={{marginRight:"0px" , maxWidth:"100%"}}>
                        {this.displayStock(messages,currentUser)}
                    </Comment.Group>
                </Segment>

             
            </div>
        )
    }
}



export default MessagePanel;