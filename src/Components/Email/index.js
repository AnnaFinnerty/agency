import React, {Component} from 'react';
import '../../App.css';

class Email extends Component{
  constructor(){
    super();
    this.state = {
      currentEmail: null
    }
  }
  selectEmail = (emailIndex) => {
    this.setState({
      currentEmail: emailIndex
    })
  }
  render(){
    console.log('email props', this.props)
    const emails = this.props.emails.map((email,i)=>{
      return(
      <li key={i} className="email"> {email.sender.name.display} | {email.subject} |{email.time} | {email.text}</li>
      )
    })
    return (
      <React.Fragment>
        <h2>Email</h2>
        <ul className='email-list'>
          {emails}
        </ul>
        <div className='email-viewer'>

        </div>
      </React.Fragment>
    );
  }
}

export default Email;
