import React, {Component} from 'react';
import '../../App.css';



class Email extends Component{
  componentDidMount(){
    // this.props.addEmail("this is a second test email")
  }
  render(){
    console.log('email props', this.props)
    const emails = this.props.emails.map((email)=>{
      return(
        <li className="email">{email}</li>
      )
    })
    return (
      <React.Fragment>
        <h2>Email</h2>
        <ul>
          {emails}
        </ul>
      </React.Fragment>
    );
  }
}

export default Email;
