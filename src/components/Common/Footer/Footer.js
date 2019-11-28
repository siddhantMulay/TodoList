
import React, { Component } from 'react';
import './Footer.css'
import Button from '../../Common/Button/Button';
import { Icon } from '@iconify/react';
import settingsIcon from '@iconify/icons-feather/settings';

class HomeContent extends Component {

    render() {
        const { buttonAction, showBtn } = this.props;
        return (
            <div className="footer">
                {showBtn ? <Button buttonText="Add Task" action={buttonAction} /> : null}
                <Icon icon={settingsIcon} />
            </div>
        )
    }
}

export default HomeContent;