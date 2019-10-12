import React from 'react';
import logo from './logo.png'

const Logo = ({Link}) => <Link to = "/home" style={{margin : "8px" , alignSelf : "flex-start" , backgroundColor: "rgb(0,0,0)", borderRadius:"18px"}}>
                            <img 
                            src={logo} 
                            alt="logo" 
                            id="logo" 
                            height="150px" 
                            width="auto" 
                            
                            />
                        </Link> 

export default Logo