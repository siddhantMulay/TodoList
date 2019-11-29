
import React, { Component } from 'react';
import './BucketCard.css'

class BucketCard extends Component {

    generateRandomColor = () => {
        let r = Math.round((Math.random() * 255)); //red 0 to 255
        let g = Math.round((Math.random() * 255)); //green 0 to 255
        let b = Math.round((Math.random() * 255)); //blue 0 to 255
        return 'rgb(' + r + ', ' + g + ', ' + b + ', ' + 0.4 + ')';
    };

    render() {
        const { title,
            taskCount,
            action,
            completedTaskCount } = this.props;
        const bgCol = this.generateRandomColor();
        return (
            <div className="bucketCard" onClick={action} style={{'background': bgCol}}>
                <div className="title">
                    {title}
                </div>
                <div className="counts">
                    {taskCount} tasks, {completedTaskCount} completed
                </div>
            </div>
        )
    }
}

export default BucketCard;