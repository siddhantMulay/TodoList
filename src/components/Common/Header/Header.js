
import React, { Component } from 'react';
import './Header.css';
import { Icon } from '@iconify/react';
import arrowLeft from '@iconify/icons-feather/arrow-left';
import { currentBucket } from '../../../redux/actions/globalActions';
import { Link } from 'react-router-dom';

class Header extends Component {

    render() {
        const { headerText,
            subHeaderText,
            homeNav } = this.props;
        return (
            <div className={`header ${homeNav ? 'homeNavVisible' : 'homeNavInVisible'}`}>
                <Link to='/home'>
                    <button className="homeNav"
                        onClick={() => currentBucket('', '', '', true)}
                    >
                        <Icon icon={arrowLeft} />
                    </button>
                </Link>
                <div className="headerData">
                    <div className="headerText">
                        {headerText}
                    </div>
                    <div className="subHeaderText">
                        {subHeaderText}
                    </div>
                </div>
            </div>

        )
    }
}

export default Header;