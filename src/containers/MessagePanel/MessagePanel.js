import "./MessagePanel.css"
import React, { Component } from 'react';

import MessagesHeader from "./MessagesHeader";
import FileModal from "./FileModal";
// import MessagesForm from "./MessagesForm";
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
            const {currentChannel,currentUser} = this.props;

            if (currentChannel && currentUser) {
                this.addListeners(currentChannel.id)
            }
        }, 1900)

    } // when component has mounted , adding listeners on channel but after a
     //delay of 1.9s so as to wait for (channel component to succefully mount so that firstChannel can be stored on global state)  


    componentWillUpdate(nextProps){
        if(nextProps.currentChannel !== this.props.currentChannel){
            this.setState({messages:""})
            this.state.messagesRef.off("child_added")
        }
    } // before component updates if previous channel is not equal to upcoming cahannel then remove previous listeners and clear messages


    componentDidUpdate(prevProps) {
        this.scrollBottom()
        const {
            currentChannel,
            currentUser
        } = this.props;

        if (prevProps.currentChannel !== currentChannel) {

            if (currentChannel && currentUser) {
                this.addListeners(currentChannel.id)
            }

            this.setState({
                messagesLoading: false
            })
        } // if prev channel is different from new channel then adding listener on new channel

    } // executes just after the compopnent has finished update


    componentWillUnmount(){
        this.state.messagesRef.off("child_added")
    } // removing the listeners befire component unmounts


    addListeners = (channelId) => {
        this.addMessageListener(channelId)
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

    displayStock = (messages,currentUser) => {
        if(messages.length>0){
            console.log(messages);
            return(
                <React.Fragment>
                    {messages.map (message => 
                        {
                            return(
                                <div key = {message.id}>
                                    <Card style={{margin:"8px", marginRight: "20px"}}>
                                        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
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


    timeFromNow = timestamp => moment(timestamp).fromNow()


    scrollBottom = () => {
        let Segment = document.getElementById("message-panel-segment")
        if(Segment !== null ){
            Segment.scrollTop = Segment.scrollHeight
        };

    } // method to scroll to bottom
    

    render(){
        const {messagesRef,messages,messagesLoading} = this.state;
        const{currentChannel,currentUser} = this.props
        return(
            <div id="message-panel" className="panels" >
                <FileModal modal = {this.state.modal} closeModal={this.closeModal}/>
                <MessagesHeader 
                    currentChannel = {this.props.currentChannel }
                />

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