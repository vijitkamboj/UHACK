import "./Channels.css"
import React, { Component } from 'react';
import {StockModal} from "../../MessagePanel/FileModal"
import {Icon, Modal,Input , Button, Popup} from "semantic-ui-react";
import firebase from "../../../firebase";
import {connect} from "react-redux";
import { changeCurrentChannel } from "../../../actions/channels";

class Channels extends Component{

    state = {
        channels: [],
        newModal: false,
        stockModal: false,

        channelName: "",
        channelDetail: "",
        dateOfPickup : "",
        timeOfPickup : "",
        stock : "",
        rate : "",

        isFormEmpty: true,
        channelsRef: firebase.database().ref("supply"),

        currentProduct:"",
        productRef: "",
        productStockRef: "",

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
            snap.val().createdBy.name === this.props.currentUser.displayName && loadedChannels.push(snap.val());
            this.setState({channels:loadedChannels});
        });

    }// whenever a child is added it returns dataSnapshot of all children and also executes first time when child_added event hasn't happened.

    displayChannels = (channels) => {
        return(
            <React.Fragment>
                {channels.length>0 && channels.filter((channel) => channel.createdBy.name === this.props.currentUser.displayName).map((channel)=> {
                    return(    
                        <li 
                            key={channel.id}
                            style={{marginTop: "10px",color:"rgba(0, 0, 0, 0.7)" }}
                            className="user-panel-channels-item" 
                        >
                            <span>
                                <Popup
                                header = {`${channel.rate} Rs/kg  |  Stock = ${channel.stock}`}
                                content={channel.orderDetail}
                                on='click'
                                pinned
                                trigger={
                                    <span
                                        name = {channel.orderName}
                                        style={{
                                            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                            fontWeight:"lighter",
                                            fontSize: "16px",
                                            color:"white"}}
                                    >
                                            
                                        {channel.orderName}
                                        
                                    </span>
                                }
                                />
                            </span>

                            <Popup 
                                content='Add stock' 
                                trigger={
                                    <Icon 
                                        name="add to cart" 
                                        size="small"
                                        className="icon" 
                                        id="add"
                                        style={{margin:"auto 20px auto 20px",color:"rgba(245,225,218,0.8)"}}
                                        onClick={()=>{this.handleAddStockClick(channel)}}
                                    />} 
                                position="right center"

                            />

                            
                            
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
        if (this.state.stockModal){
            this.addStock(this.state)
        }
    } // method to handle submit event

    addChannel = ({channelDetail,channelName,channelsRef,dateOfPickup,timeOfPickup , stock,rate}) => {

        const { displayName , photoURL} = this.props.currentUser
        const key = channelsRef.push().key
        const newChannel = {
            id: key,
            orderName: channelName,
            orderDetail: channelDetail,
            dateOfPickup : dateOfPickup,
            timeOfPickup : timeOfPickup,
            stock : stock,
            rate : rate,
            createdBy: {
                name: displayName,
                avatar: photoURL
            }
        }
        this.closenewModal();

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

        if (this.state.channelDetail === "" || this.state.channelName === "" || this.state.dateOfPickup === "" || this.state.timeOfPickup === "" || this.state.stock === "" || this.state.rate === ""){
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

    handleAddStockClick = (message) => {
        this.setState({
            stockModal:true,
            currentProduct: message,
            productStockRef : firebase.database().ref("supply/" + message.id+"/stock"),
        })
    }

    placeOrder = (amount) => {
        this.state.productStockRef.set(Number(this.state.currentProduct.stock) + Number(amount))

    }

    closeStockModal = () => {
        this.setState({
            stockModal:false,
            currentProduct: "",
            productRef : "",
            productStockRef:""
        })
    }


    shownewModal = () => {
        this.setState({newModal:true,isFormEmpty:true,channelName: "",channelDetail: "",})
    } // method to show modal
 
    closenewModal = () => {
        this.setState({newModal:false })
    } // methos to close the modal

    handleEnter = (event) => {
        if (event.keyCode === 13){
            this.handleSubmit(event)
        }
    } // method to check if enter is pressed

    render(){
        const {channels ,newModal , isFormEmpty ,stockModal , currentProduct} = this.state;
        const{shownewModal , closenewModal, placeOrder} =this;
        
        return(
            <React.Fragment>
                {/* displaying channel heading */}~
                <div id="user-panel-channels-header" >
                <Icon name="circle" size="small" style={{margin:"auto 10px auto 0",color:"rgba(255,153,153)"}} />

                    Stock ({channels.length})

                    <Icon 
                    name="add" 
                    size="small"
                    className="icon" 
                    id="add"
                    style={{margin:"auto 20px auto auto",color:"rgba(0, 0, 0, 0.7)"}}
                    onClick={shownewModal}
                    
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

                <StockModal modal = {stockModal} closeModal = {this.closeStockModal} placeOrder={placeOrder} currentProduct={currentProduct} />
                
                {/* dispalying modal */}
                <Modal basic open={newModal} closeIcon onClose={closenewModal} onKeyDown={this.handleEnter}>

                    <Modal.Header 
                        icon="add" 
                        style={{
                            fontWeight:"lighter",
                            color: "rgb(226, 226, 226)",
                            border:"none",
                        }}
                    >
                        Add new item ...
                    </Modal.Header>

                    <Modal.Content style={{border:"none",fontWeight:"lighter"}}>

                        <Input 
                            fluid 
                            name="channelName"
                            label = "Material Type"
                            onChange={this.handleChange}
                            style={{marginBottom:"10px"}}
                        />

                        <Input 
                            fluid 
                            name="channelDetail"
                            label = "Material Source"
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
                            name="stock"
                            label = {`Stock`}
                            placeholder = "Square Meter"
                            onChange={this.handleChange}
                            style={{marginBottom:"10px"}}
                        />
                         <Input 
                            fluid 
                            type = "text"
                            name="rate"
                            placeholder = "Rs / sq-mt"
                            label = "Proposed rate"
                            onChange={this.handleChange}
                            style={{marginBottom:"10px"}}
                        />
                        <Input 
                            fluid 
                            label="jpeg, png"
                            name="file"
                            type="file"
                            onChange={this.addFile}
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
                            onClick={this.closenewModal}
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