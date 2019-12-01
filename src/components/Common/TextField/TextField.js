
import React, { Component } from 'react';
import { Icon } from '@iconify/react';
import chevronDown from '@iconify/icons-feather/chevron-down';
import DropdownList from './DropdownList';
import './TextField.css';

class TextField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownVisible: false,
            value: props.value || ''
        }
    }

    closeDropdown = () => {
        this.setState({
            dropdownVisible: false
        })
    }

    openDropdown = () => {
        this.setState({
            dropdownVisible: true
        })
    }

    handleChange = (data, callFrom, name) => {
        const { onChange, dropdownData } = this.props;
        const value = callFrom === 'dropdown' ? name : data.target.value;

        if (dropdownData !== undefined) {
            if (dropdownData.length > 0) {
                this.openDropdown()
            }
        }

        if (callFrom === 'dropdown') {
            this.closeDropdown()
        }

        this.setState({
            value: value
        })

        let finalVal = callFrom !== 'dropdown' ? value : data;
        onChange(finalVal, callFrom)
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }

    componentDidMount() {
        document.addEventListener('click', this.handleOutsideClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideClick);
    }

    handleOutsideClick = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.closeDropdown();
        }
    }

    render() {
        const { dropdownVisible, value } = this.state;
        const { label,
            type,
            placeholder,
            hasDropdown,
            readOnly,
            dropdownData
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
                        ref={this.setWrapperRef}
                        value={value}
                        readOnly={readOnly}
                        onFocus={dropdownData !== undefined ?
                            dropdownData.length > 0 ? this.openDropdown : null
                            : null}
                        // onBlur={() => this.closeDropdown()}
                        onChange={(e) => this.handleChange(e, label)}
                        placeholder={placeholder} />
                }

                {hasDropdown ?
                    <DropdownList
                        data={dropdownData}
                        visible={dropdownVisible}
                        onSelect={(e, name) => this.handleChange(e, 'dropdown', name)} />
                    : null}

                {dropdownData !== undefined ? dropdownData.length > 0 ?
                    <Icon icon={chevronDown} className="ddIcon" />
                    : null : null}
            </div>
        )
    }
}

export default TextField;