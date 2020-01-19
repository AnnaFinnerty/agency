import React, {Component} from 'react';
import {Feed,Input,Button} from 'semantic-ui-react';

class Message extends Component{
    constructor(){
        super();
        this.state = {
            open: true,
        }
    }
    open = () => {
        this.setState({
            open: true
        })
    }
    close = () => {
        this.setState({
            open: false
        })
    }
    render(){
        const messages = this.props.messages.map((message)=> {
            return(
                <div>{message.sender}: {message.text}</div>
            )
        })
        return(
            <div style={{overflow:"hidden"}} className={this.state.open ? 'message message-open': 'message message-closed'}>
                {
                    this.state.open ? 
                    <Button onClick={this.close} style={{right:'0',position:'fixed'}}>X</Button>
                    :
                    <Button onClick={this.open} style={{right:'0',position:'fixed'}}>X</Button>
                }
                {
                    !this.state.open ? "" :
                    <React.Fragment>
                        <Feed style={{minHeight:"28vh", overflowY:"scroll", display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>
                            {messages}
                        </Feed>
                        <Input fluid placeholder="..." ></Input>
                    </React.Fragment>
                }
            </div>
        )
    }
}

export default Message