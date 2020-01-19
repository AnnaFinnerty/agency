import React, {Component} from 'react';
import {Feed,Input,Button,Icon} from 'semantic-ui-react';

class Message extends Component{
    constructor(){
        super();
        this.state = {
            open: true,
        }
    }
    render(){
        const messages = this.props.messages.map((message)=> {
            return(
                <div>{message.text}</div>
            )
        })
        return(
            <div className='message-open'>
                <Feed style={{height:"30vh"}}>
                    {messages}
                </Feed>
                <Input fluid placeholder="..." ></Input>
            </div>
        )
    }
}

export default Message