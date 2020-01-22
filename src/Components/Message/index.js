import React, {Component} from 'react';
import {Feed,Input,Label,Button} from 'semantic-ui-react';

class Message extends Component{
    constructor(){
        super();
        this.state = {
            open: false,
            text: '',
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
    onChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }
    onSubmit = () => {

    }
    render(){
        const messages = this.props.messages.map((message)=> {
            return(
                <div>{message.sender}: {message.text}</div>
            )
        })
        return(
            <div style={{overflow:"hidden"}} className={this.state.open ? 'message message-open': 'message message-closed'}>
                <div style={{position:'fixed',width:'100%'}}>
                {
                    this.state.open ? 
                    <Button onClick={this.close} style={{right:'15px',position:'fixed',padding:'4px'}}>X</Button>
                    :
                    <Button onClick={this.open} style={{right:'15px',position:'fixed',padding:'4px'}}>X</Button>
                }
                </div>
                {
                    !this.state.open ? "" :
                    <React.Fragment>
                        <Feed style={{height:"50vh",marginTop:"-20vh", overflowY:"scroll", display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>
                            {messages}
                        </Feed>
                        <Input fluid placeholder="..." value={this.state.text} onChange={this.onChange} ></Input>
                    </React.Fragment>
                }
            </div>
        )
    }
}

export default Message