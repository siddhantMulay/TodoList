
import React, { Component } from 'react';
import './Button.css';

class Button extends Component {

    render() {
        const { buttonText,
            action,
            className
        } = this.props;
        return (
            <button className={`button ${className}`} onClick={action}>{buttonText}</button>
        )
    }
}

export default Button;