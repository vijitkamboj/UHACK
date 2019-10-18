import "./SidePanel.css"
import React, { Component } from 'react';
import UserPanel from "./UserPanel/UserPanel"
import Channels from "./Channels/Channels"

class SidePanel extends Component{

    render(){
        return(
            <div id="side-panel" className="panels">
                <UserPanel currentUser = {this.props.currentUser}/>
                <Channels currentUser = {this.props.currentUser}/>
            </div>
        )
    }
}

export default SidePanel ;