import React from 'react';

import {Icon} from 'semantic-ui-react';

const PauseScreen = (props) => (
    <div className="pause-screen">
        <div className="pause-button">
            <Icon onClick={props.startTimer} className="pause-button" name="play"></Icon>
        </div>
    </div>
)

export default PauseScreen