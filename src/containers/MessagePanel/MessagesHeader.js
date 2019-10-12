import React, { Component } from 'react';
import {Segment,Input} from "semantic-ui-react"



class MessagesHeader extends Component{
    render(){
        return(
            <Segment clearing style={{width:"95%",margin:"10px auto 0 auto", height:"auto"}} >

                <span style={{fontSize:"20px",marginRight:"8px"}}>
                    {this.props.currentChannel && this.props.currentChannel.name}
                </span>

                <Input 
                    name="channelSearch" 
                    icon="search" 
                    iconPosition="left" 
                    placeholder="Search Fabrics" 
                    style={{float:"right",margin:"auto 0 "}}
                 />

            </Segment>
        )
    }
}

export default MessagesHeader