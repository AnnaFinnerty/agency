import React from 'react';
import {Icon} from 'semantic-ui-react';

const Logo = (props) => (
    <div style={{backgroundColor:"white",height:'14vh',paddingTop:'3vh'}}>
        <Icon 
              onClick={()=>props.appOpenModal('about')}
              style={{position:"fixed",left:"1vw"}} 
              name="question circle outline"
              className="hover"
            >
        </Icon>
        <h1 style={{color:"black"}}>agency</h1>
    </div>
)

export default Logo