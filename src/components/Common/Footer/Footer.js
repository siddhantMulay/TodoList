
import React, { Component } from 'react';
import './Footer.css'
import Button from '../../Common/Button/Button';
import { changeTheme } from '../../../redux/actions/globalActions';
import { Icon } from '@iconify/react';
import flashlightOn from '@iconify/icons-jam/flashlight-on';
import flashlightOff from '@iconify/icons-jam/flashlight-off';

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            darkTheme: 'dark'
        }
    }

    changeTheme = () => {
        this.setState({
            darkTheme: !this.state.darkTheme
        }, () => {
            let theme = this.state.darkTheme ? 'dark' : 'light';
            changeTheme(theme);
        })
    }

    render() {
        const { darkTheme } = this.state;
        const { action, showBtn } = this.props;
        return (
            <div className="footer">
                {showBtn ? <Button buttonText="Add Task" action={action} /> : null}
                <Icon
                    className="themeChanger"
                    onClick={() => this.changeTheme()}
                    icon={darkTheme ? flashlightOff : flashlightOn} />
            </div>
        )
    }
}

export default Footer;