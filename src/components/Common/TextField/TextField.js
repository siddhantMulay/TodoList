
import React, { Component } from 'react';
import { Icon } from '@iconify/react';
import chevronDown from '@iconify/icons-feather/chevron-down';
import Autocomplete from './Autocomplete';
import './TextField.css';

class TextField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            autocompleteVisible: false
        }
    }

    handleChange = (data, callFrom) => {
        const { onChange } = this.props;
        const value = callFrom === 'autocomp' ? data : data.target.value;

        if (callFrom === 'autocomp') {
            this.setState({
                autocompleteVisible: false
            })
        }
        onChange(value, callFrom)
    }

    render() {
        const { autocompleteVisible } = this.state;
        const { label,
            type,
            placeholder,
            autocomplete,
            value
        } = this.props;
        return (
            <div className="textField">
                <div className="label">{label}</div>
                {type === 'textarea' ?
                    <textarea
                        rows="2"
                        value={value}
                        onChange={(e) => this.handleChange(e, label)}
                        placeholder={placeholder}
                    />
                    :
                    <input
                        type={label}
                        value={value}
                        onChange={(e) => this.handleChange(e, label)}
                        placeholder={placeholder} />
                }

                {autocomplete ?
                    <Autocomplete
                        visible={autocompleteVisible}
                        onSelect={(e) => this.handleChange(e, 'autocomp')} />
                    : null}

                {autocomplete ?
                    <Icon icon={chevronDown} className="autoCompIcon" />
                    : null}
            </div>
        )
    }
}

export default TextField;