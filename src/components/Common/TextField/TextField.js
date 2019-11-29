
import React, { Component } from 'react';
import { Icon } from '@iconify/react';
import chevronDown from '@iconify/icons-feather/chevron-down';
import Autocomplete from './Autocomplete';
import './TextField.css';

class TextField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            autocompleteVisible: false,
            value: props.value || undefined
        }
    }

    closeAutoComplete = () => {
        this.setState({
            autocompleteVisible: false
        })
    }

    openAutoComplete = () => {
        this.setState({
            autocompleteVisible: true
        })
    }


    handleChange = (data, callFrom, name) => {
        const { onChange, autoCompData } = this.props;
        const value = callFrom === 'autocomp' ? name : data.target.value;

        if (autoCompData !== undefined) {
            if (autoCompData.length > 0) {
                this.openAutoComplete()
            }
        }

        if (callFrom === 'autocomp') {
            this.closeAutoComplete()
        }

        this.setState({
            value: value
        })

        let finalVal = callFrom !== 'autocomp' ? value : data;
        onChange(finalVal, callFrom)
    }

    render() {
        const { autocompleteVisible, value } = this.state;
        const { label,
            type,
            placeholder,
            autocomplete,
            autoCompData
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
                        onFocus={autoCompData !== undefined ?
                            autoCompData.length > 0 ? this.openAutoComplete : null
                            : null}
                        // onBlur={this.closeAutoComplete}
                        onChange={(e) => this.handleChange(e, label)}
                        placeholder={placeholder} />
                }

                {autocomplete ?
                    <Autocomplete
                        data={autoCompData}
                        visible={autocompleteVisible}
                        onSelect={(e, name) => this.handleChange(e, 'autocomp', name)} />
                    : null}

                {autoCompData !== undefined ? autoCompData.length > 0 ?
                    <Icon icon={chevronDown} className="autoCompIcon" />
                    : null : null}
            </div>
        )
    }
}

export default TextField;