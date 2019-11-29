
import React, { Component } from 'react';
import TextField from '../components/Common/TextField/TextField';
import Modal from '../components/Common/Modal/Modal';
import Task from '../components/PageComponents/Task/Task';
import { connect } from 'react-redux';
import { toggleTaskStatus } from '../redux/actions/taskActions';
import { currentBucket, setTasks } from '../redux/actions/globalActions';

class Bucket extends Component {

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

    toggleTaskStaus = (id, status) => {
        const { currentBucketData, tasks } = this.props;
        toggleTaskStatus(id, status).then(()=>{
            currentBucket(currentBucketData.id, currentBucketData.name, tasks).then(() => {
                setTasks(tasks)
            })
        })
    }

    renderTasks = () => {
        const { currentBucketData } = this.props;
        let retArr = [];

        if (currentBucketData.tasks.length > 0) {
            for (var i in currentBucketData.tasks) {
                retArr.push(<Task
                    key={'tasks' + i}
                    onChange={this.toggleTaskStaus}
                    taskId={currentBucketData.tasks[i]['id']}
                    taskText={currentBucketData.tasks[i]['title']}
                    editAction={this.openTaskModal}
                    status={currentBucketData.tasks[i]['completed']} />)
            }
        }

        return retArr;
    }

    render() {
        const { taskModalVisible } = this.state;
        return (
            <div className="bucketContent pageContent">
                {this.renderTasks()}

                <Modal
                    headerText={`Edit Task`}
                    secAction={this.closeTaskModal}
                    visible={taskModalVisible}
                    content={
                        <div>
                            <TextField
                                autocomplete={true}
                                onChange={this.handleInputChange}
                                label="Where to?"
                                type="text"
                                placeholder="Enter category name" />
                            <TextField
                                onChange={this.handleInputChange}
                                label="What you gonna do?"
                                type="textarea"
                                placeholder="Do this... or that" />

                        </div>
                    }
                    primaryBtnText={`Set Sail!`} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const globalStore = state.global;
    const taskStore = state.task;
    return {
        currentBucketData: globalStore.currentBucket,
        tasks: taskStore.tasks
    }
}

export default connect(mapStateToProps)(Bucket);