import React from 'react';
import {Modal,Icon} from 'semantic-ui-react';

const Instructions = () => (
    <Modal.Description>
        <p>
            <Icon name="computer"></Icon>
            You've been asked to manage your a small web development agency.
        </p>
        <p>
            <Icon name="clipboard"></Icon>
            Pick the projects you think you can complete on time and try to keep the agency afloat.
        </p>
        <p>
            <Icon name="user"></Icon>
            Put your employees on the right projects to complete them on time. If they aren't working out, you can fire them and hire a new applicant.
        </p>
        <p>
            <Icon name="mail"></Icon>
            Check your email to see if employees are having problems, and try to fix them.
        </p>
    </Modal.Description>
)

export default Instructions