
import React, { Component } from 'react';
import './TextField.css';

class Autocomplete extends Component {

    renderAutoCompList = () => {
        const { data, onSelect } = this.props;
        let retArr = [];
        for (var i in data) {
            retArr.push(<div className="item" key={'auto' + i} onClick={() => onSelect(data[i]['id'], data[i]['name'])}>
                {data[i]['name']}
            </div>)
        }
        return retArr;
    }

    render() {
        const { visible } = this.props;
        return (
            <div className={`autocomplete ${visible ? 'visible' : 'invisible'}`}>
                {this.renderAutoCompList()}
            </div>
        )
    }
}

export default Autocomplete;