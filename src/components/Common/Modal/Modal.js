
import React, { Component } from 'react';
import Button from '../Button/Button';
import './Modal.css';

class Modal extends Component {

    render() {
        const { visible,
            content,
            primaryAction,
            primaryBtnText,
            secAction,
            headerText,
            headerAction
        } = this.props;
        return (
            <div className={`modal ${visible ? 'visible' : 'invisible'}`}>
                <div className="modalInner">
                    <div className="header">
                        <div className="headerText">{headerText}</div>
                        {headerAction ? headerAction : null}
                    </div>
                    <div className="content">
                        {content}
                    </div>
                    <div className="footer">
                        <Button className="secButton" action={secAction} buttonText="Cancel" />
                        <Button action={primaryAction} buttonText={primaryBtnText} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;