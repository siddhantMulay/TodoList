
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BucketCard.css'

class BucketCard extends Component {

    generateRandomDarkColors = () => {
        let r = Math.round((Math.random() * 255));
        let g = Math.round((Math.random() * 255));
        let b = Math.round((Math.random() * 255));
        return 'rgb(' + r + ', ' + g + ', ' + b + ', ' + 0.4 + ')';
    };

    generateRandomLightColors = () => {
        let color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
        return color;
    }

    render() {
        const { title,
            taskCount,
            action,
            completedTaskCount,
            theme } = this.props;
        const bgCol = theme.theme === 'dark' ? this.generateRandomLightColors() : this.generateRandomDarkColors();
        const allTasksDone = taskCount === completedTaskCount;
        return (
            <div className="bucketCard" onClick={action} style={{ 'background': bgCol }}>
                <div className="title">
                    {title}
                </div>
                <div className="counts">
                    {taskCount === 0 || taskCount === undefined ? "Nothing in here" :
                        `${allTasksDone ? 'Another one bites to dust!' :
                            `${taskCount} task(s), ${completedTaskCount} completed`
                        }`
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const globalStore = state.global;
    return {
        theme: globalStore.theme
    }
}

export default connect(mapStateToProps)(BucketCard);