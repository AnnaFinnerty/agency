import React from 'react';

const PersonalIcon = (props) => (
    <div className="personal-icon" style={{backgroundImage:"url('/icons/"+props.icon+".png')"}}></div>
)

export default PersonalIcon;