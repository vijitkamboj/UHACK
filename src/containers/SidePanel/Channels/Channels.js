import "./Channels.css"
import React, { Component } from 'react';
import {Icon, Modal,Input , Button} from "semantic-ui-react";
import firebase from "../../../firebase";
import {connect} from "react-redux";
import { changeCurrentChannel } from "../../../actions/channels";

class Channels extends Component{

    state = {
        channels: [],
        modal: false,
        channelName: "",
        channelDetail: "",
        dateOfPickup : "",
        timeOfPickup : "",
        weightOfOrder : "",
        rate : "",
        isFormEmpty: true,
        channelsRef: firebase.database().ref("supply"),
        firstLoad: true,
        activeChannel: ""
    } // defining local state for channel compoenent


    componentDidMount(){
        this.addListeners();
    }  // adding database listeners when component mounts

    componentWillUnmount(){
        this.state.channelsRef.off("child_added")
    } // removing the listeners before component unmounts

    addListeners = () => {
        let loadedChannels = [];
        this.state.channelsRef.on("child_added", snap => {
            loadedChannels.push(snap.val());
            loadedChannels.length === 1 && this.props.changeCurrentChannel(loadedChannels[0]);
            this.setFirstChannel(loadedChannels);
            this.setState({channels:loadedChannels});
        });

    }// whenever a child is added it returns dataSnapshot of all children and also executes first time when child_added event hasn't happened.


    setFirstChannel = (channels) => {
        if(this.state.firstLoad === true && channels.length>0 ){
            this.setState({activeChannel : channels[0],firstLoad:false})
           
        }
    }

    handleChannelClick = (channel) => {
        this.setState({
            activeChannel: channel
        })
        this.props.changeCurrentChannel(channel)

    }

    displayChannels = (channels) => {
        return(
            <React.Fragment>
                {channels.length>0 && channels.map((channel)=> {
                    return(    
                        <li 
                            key={channel.id}
                            style={{marginTop: "10px",color:this.state.activeChannel === channel ?"white" : " rgba(0, 0, 0, 0.7)" }}
                            className="user-panel-channels-item" 
                            onClick={()=>this.handleChannelClick(channel)}
                        >
                            <span
                                name = {channel.orderName}
                                style={{
                                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                    fontWeight:"lighter",
                                    fontSize: "16px",
                                    color:"white"

                                }}
                            >
                                {channel.orderName}
                            </span>
                        </li>
                    )
                })
                }
            </React.Fragment>  // wrapping multiple list items inside react.fragment 
        )

    } // methods that generates list elements of channel name

    handleSubmit = (event) => {
        event.preventDefault();
        if (!this.state.isFormEmpty){   
            this.addChannel(this.state)
        }
    } // method to handle submit event
d
    addChannel = ({channelDetail,channelName,channelsRef,dateOfPickup,timeOfPickup , weightOfOrder,rate}) => {

        const { displayName , photoURL} = this.props.currentUser
        const key = channelsRef.push().key
        const newChannel = {
            id: key,
            orderName: channelName,
            orderDetail: channelDetail,
            dateOfPickup : dateOfPickup,
            timeOfPickup : timeOfPickup,
            weightOfOrder : weightOfOrder,
            rate : rate,
            createdBy: {
                name: displayName,
                avatar: photoURL
            }
        }
        this.closeModal();

        channelsRef
            .child(key)
            .update(newChannel)
            .then(() => {
                this.setState({
                    channelName: "",
                    channelDetail: "",
                    isFormEmpty: true
                });

            })
            .catch(err => alert(err))
    } // method used to store channel into the database

    handleChange = (event) => {
        
        this.setState({
            [event.target.name]: event.target.value,
        })

        if (this.state.channelDetail === "" || this.state.channelName === "" || this.state.dateOfPickup === "" || this.state.timeOfPickup === "" || this.state.weightOfOrder === "" || this.state.rate === ""){
            this.setState({
                isFormEmpty : true
            })
        }else{
            this.setState({
                isFormEmpty : false
            })
        }

        if (event.target.value === ""){
            this.setState({
                isFormEmpty: true
            })
        }

    } // method to handle changes in the input field and constantly updating isFormEmpty state

    showModal = () => {
        this.setState({modal:true,isFormEmpty:true,channelName: "",channelDetail: "",})
    } // method to show modal
 
    closeModal = () => {
        this.setState({modal:false })
    } // methos to close the modal

    handleEnter = (event) => {
        if (event.keyCode === 13){
            this.handleSubmit(event)
        }
    } // method to check if enter is pressed

    render(){
        const {channels ,modal , isFormEmpty} = this.state;
        const{showModal , closeModal} =this;
        
        return(
            <React.Fragment>
                {/* displaying channel heading */}
                <div id="user-panel-channels-header" >
                <Icon name="circle" size="small" style={{margin:"auto 10px auto 0",color:"rgba(255,153,153)"}} />

                    Orders ({channels.length})

                    <Icon 
                    name="add" 
                    size="small"
                    className="icon" 
                    id="add"
                    style={{margin:"auto 20px auto auto",color:"rgba(0, 0, 0, 0.7)"}}
                    onClick={showModal}
                    />

                </div> 
                
                {/* displaying channels */}
                <ul style={{
                    fontSize:"16px",
                    paddingLeft:"55px",
                    marginTop:"0px"
                }}>
                   {this.displayChannels(channels)}
                </ul>
                
                {/* dispalying modal */}
                <Modal basic open={modal} closeIcon onClose={closeModal} onKeyDown={this.handleEnter}>

                    <Modal.Header 
                        icon="add" 
                        style={{
                            fontWeight:"lighter",
                            color: "rgb(226, 226, 226)",
                            border:"none",
                        }}
                    >
                        Sell fabric
                    </Modal.Header>

                    <Modal.Content style={{border:"none",fontWeight:"lighter"}}>

                        <Input 
                            fluid 
                            label="Type of Material"
                            name="channelName"
                            onChange={this.handleChange}
                            style={{marginBottom:"10px"}}
                        />

                        <Input 
                            fluid 
                            name="channelDetail"
                            label = "Material Detail"
                            onChange={this.handleChange}
                            style={{marginBottom:"10px"}}
                        />
                        
                        <Input 
                            fluid 
                            type = "date"
                            name="dateOfPickup"
                            label = "Pickup date"
                            onChange={this.handleChange}
                            style={{marginBottom:"10px"}}
                        />

                        <Input 
                            fluid 
                            type="time"
                            label="Pickup Time"
                            name="timeOfPickup"
                            onChange={this.handleChange}
                            style={{marginBottom:"10px"}}
                        />

                        <Input 
                            fluid 
                            name="weightOfOrder"
                            label = "Order Weight"
                            onChange={this.handleChange}
                            style={{marginBottom:"10px"}}
                        />
                         <Input 
                            fluid 
                            type = "text"
                            name="rate"
                            label = "Rate"
                            onChange={this.handleChange}
                            style={{marginBottom:"10px"}}
                        />

                    </Modal.Content>

                    <Modal.Actions style={{border:"none"}}>
                    
                        <Button 
                            color="green" 
                            basic 
                            inverted 
                            onClick={this.handleSubmit} 
                            disabled={isFormEmpty}
                        >
                            <Icon name="checkmark"/>
                            Add
                        </Button>

                        <Button 
                            color="red" 
                            basic 
                            inverted 
                            onClick={this.closeModal}
                        >
                            <Icon name="remove" />
                            Cancel
                        </Button>

                    </Modal.Actions>
                </Modal>

            </React.Fragment>
        )
    }
}

export default connect(null,{changeCurrentChannel})(Channels) ;