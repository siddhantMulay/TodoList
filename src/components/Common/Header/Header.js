
import React, { Component } from 'react';
import './Header.css';

class Header extends Component {

    render() {
        const { headerText,
            subHeaderText,
            homeNav } = this.props;
        return (
            <div className="header">
                <div className="headerText">
                    {headerText}
                </div>
                <div className="subHeaderText">
                    {subHeaderText}
                </div>
            </div>

        )
    }
}

export default Header;