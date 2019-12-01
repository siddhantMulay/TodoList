
import React, { Component } from 'react';
import './TextField.css';

class DropdownList extends Component {

    renderDDList = () => {
        const { data, onSelect } = this.props;
        let retArr = [];
        for (var i in data) {
            let itemId = data[i]['id'];
            let itemName = data[i]['name'];
            retArr.push(<div className="item"
                key={'auto' + i}
                onClick={() => onSelect(itemId, itemName)}>
                {data[i]['name']}
            </div>)
        }
        return retArr;
    }

    render() {
        const { visible } = this.props;
        return (
            <div className={`dropdownList ${visible ? 'visible' : 'invisible'}`}>
                {this.renderDDList()}
            </div>
        )
    }
}

export default DropdownList;