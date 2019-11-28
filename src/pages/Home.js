
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeContent from '../components/PageComponents/HomeContent/HomeContent';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskModalVisible: false
        }
    }

    openTaskModal = () => {
        this.setState({
            taskModalVisible: true
        })
    }

    closeTaskModal = () => {
        this.setState({
            taskModalVisible: false
        })
    }

    handleInputChange = (value, callFrom) => {
        console.log(value, callFrom)
    }

    taskAction = (action, data) => {
        
    }

    render() {
        const { taskModalVisible } = this.state;
        const { tasks } = this.props;
        const emptyState = tasks.length > 0 ? false : true;

        return (
            <div className="page" data-page="Home">
                <HomeContent 
                openTaskModal={this.openTaskModal}
                closeTaskModal={this.closeTaskModal}
                emptyState={emptyState} 
                handleInputChange={this.handleInputChange}
                taskModalVisible={taskModalVisible} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const taskStore = state.task;
    return {
        tasks: taskStore.tasks
    }
}

export default connect(mapStateToProps)(Home);