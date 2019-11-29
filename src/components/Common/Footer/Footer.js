
import React, { Component } from 'react';
import './Footer.css'
import Button from '../../Common/Button/Button';
import { Icon } from '@iconify/react';
import settingsIcon from '@iconify/icons-feather/settings';

class Footer extends Component {

    render() {
        const { action, showBtn } = this.props;
        return (
            <div className="footer">
                {showBtn ? <Button buttonText="Add Task" action={action} /> : null}
                <Icon icon={settingsIcon} />
            </div>
        )
    }
}

export default Footer;