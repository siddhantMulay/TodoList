
import React, { Component } from 'react';
import './TextField.css';

class Autocomplete extends Component {

    render() {
        const { data,
            visible,
            onSelect
        } = this.props;
        return (
            <div className={`autocomplete ${visible ? 'visible' : 'invisible'}`}>
                <div className="item" onClick={() => onSelect('Lion')}>
                    Lion
                </div>
                <div className="item" onClick={() => onSelect('Tiger')}>
                    Tiger
                </div>
            </div>
        )
    }
}

export default Autocomplete;