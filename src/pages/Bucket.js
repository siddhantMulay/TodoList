
import React, { Component } from 'react';
import TextField from '../components/Common/TextField/TextField';
import Modal from '../components/Common/Modal/Modal';
import Task from '../components/PageComponents/Task/Task';
import { connect } from 'react-redux';
import { toggleTaskStatus, updateTask, deleteTask } from '../redux/actions/taskActions';
import { currentBucket, setTasks, globalTaskObj } from '../redux/actions/globalActions';
import Footer from '../components/Common/Footer/Footer';

class Bucket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taskModalVisible: false,
            valuesLoaded: false,
            currTaskId: ''
        }
    }

    componentDidUpdate() {
        const { globalTaskObj } = this.props;
        const { valuesLoaded } = this.state;
        if (!valuesLoaded) {
            if (globalTaskObj['bucket'] !== '' && globalTaskObj['task'] !== '') {
                this.setState({
                    valuesLoaded: true
                })
            }
        }
    }

    openTaskModal = (taskId, taskTitle, bucketId) => {

        globalTaskObj(bucketId, 'bucket');
        globalTaskObj(taskTitle, 'task');

        this.setState({
            taskModalVisible: true,
            currTaskId: taskId
        })
    }

    closeTaskModal = () => {
        this.setState({
            taskModalVisible: false,
            currTaskId: ''
        })
    }

    handleInputChange = (value, callFrom) => {
        globalTaskObj(value, callFrom)
    }

    toggleTaskStaus = (id, status) => {
        const { currentBucketData, tasks } = this.props;
        toggleTaskStatus(id, status).then(() => {
            currentBucket(currentBucketData.id, currentBucketData.name, tasks).then(() => {
                setTasks(tasks)
            })
        })
    }

    updateTask = () => {
        const { currTaskId } = this.state;
        const { globalTaskObj, currentBucketData, tasks } = this.props;
        updateTask(currTaskId, globalTaskObj['bucket'], globalTaskObj['Task']).then(() => {
            currentBucket(currentBucketData.id, currentBucketData.name, tasks).then(() => {
                setTasks(tasks)
                this.closeTaskModal();
            })
        });
    }

    deleteTask = (taskId) => {
        const { currentBucketData } = this.props;
        deleteTask(taskId).then(() => {
            const { tasks } = this.props;
            console.log(tasks)
            currentBucket(currentBucketData.id, currentBucketData.name, tasks).then(() => {
                setTasks(tasks)
            })
        });
    }

    renderTasks = () => {
        const { currentBucketData } = this.props;
        let retArr = [];

        if (currentBucketData.tasks != undefined && currentBucketData.tasks.length > 0) {
            for (var i in currentBucketData.tasks) {
                const taskId = currentBucketData.tasks[i]['id'];
                const taskTitle = currentBucketData.tasks[i]['title'];
                const bucketId = currentBucketData.id;

                retArr.push(<Task
                    key={'tasks' + i}
                    onChange={this.toggleTaskStaus}
                    taskId={taskId}
                    taskText={taskTitle}
                    editAction={() => this.openTaskModal(taskId, taskTitle, bucketId)}
                    delAction={() => this.deleteTask(taskId)}
                    status={currentBucketData.tasks[i]['completed']} />)
            }
        }

        return retArr;
    }

    render() {
        const { taskModalVisible, valuesLoaded } = this.state;
        const { buckets, globalTaskObj } = this.props;

        return (
            <div className="bucketContent pageContent">
                {this.renderTasks()}
                <Modal
                    headerText={`Edit Task`}
                    secAction={this.closeTaskModal}
                    visible={taskModalVisible}
                    primaryAction={() => this.updateTask()}
                    content={
                        valuesLoaded ?
                            <div>
                                <TextField
                                    autocomplete={true}
                                    autoCompData={buckets}
                                    onChange={this.handleInputChange}
                                    value={globalTaskObj['bucket']}
                                    label="Bucket"
                                    type="text"
                                    placeholder="Where will it go?" />
                                <TextField
                                    onChange={this.handleInputChange}
                                    value={globalTaskObj['task']}
                                    label="Task"
                                    type="textarea"
                                    placeholder="What's on your mind?" />
                            </div>
                            : null
                    }
                    primaryBtnText={`Set Sail!`} />

                    <Footer showBtn={true} action={this.openTaskModal} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const globalStore = state.global;
    const bucketStore = state.bucket;
    const taskStore = state.task;
    return {
        currentBucketData: globalStore.currentBucket,
        buckets: bucketStore.buckets,
        tasks: taskStore.tasks,
        globalTaskObj: globalStore.globalTaskObj
    }
}

export default connect(mapStateToProps)(Bucket);