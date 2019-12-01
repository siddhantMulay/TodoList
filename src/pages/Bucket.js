
import React, { Component } from 'react';
import TextField from '../components/Common/TextField/TextField';
import Modal from '../components/Common/Modal/Modal';
import Task from '../components/PageComponents/Task/Task';
import { connect } from 'react-redux';
import { toggleTaskStatus, updateTask, deleteTask } from '../redux/actions/taskActions';
import { currentBucket, setTasks, globalTaskObj, bucketWiseTaskCount } from '../redux/actions/globalActions';
import Footer from '../components/Common/Footer/Footer';
import Utilities from '../common/Utilities';

class Bucket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taskModalVisible: false,
            valuesLoaded: false,
            bucketChange: false,
            modalAction: '',
            currTaskId: '',
            emptyDataObj: {}
        }
    }

    openTaskModal = (taskId, taskTitle, bucketId, action) => {

        globalTaskObj(bucketId, 'bucket');
        globalTaskObj(taskTitle, 'task');

        this.setState({
            taskModalVisible: true,
            modalAction: action,
            currTaskId: taskId
        }, () => {

            globalTaskObj(bucketId, 'bucket');
            this.setState({
                valuesLoaded: true
            })
        })
    }

    closeTaskModal = () => {
        this.setState({
            taskModalVisible: false,
            valuesLoaded: false,
            bucketChange: false,
            currTaskId: ''
        }, () => {
            globalTaskObj('', 'bucket');
            globalTaskObj('', 'task');
        })
    }

    handleInputChange = (value, callFrom) => {
        let temp = callFrom.toLowerCase();

        if (temp === 'dropdown') {
            temp = 'bucket'
            this.setState({
                bucketChange: true
            })
        }
        this.setState({
            emptyDataObj: Object.assign({
                ...this.state.emptyDataObj,
                [temp]: false
            })
        })
        globalTaskObj(value, temp)
    }

    toggleTaskStaus = (id, status) => {
        const { currentBucketData, tasks, buckets } = this.props;
        toggleTaskStatus(id, status).then(() => {
            currentBucket(currentBucketData.id, currentBucketData.name, tasks).then(() => {
                setTasks(tasks)
                bucketWiseTaskCount(tasks, buckets);
            })
        })
    }

    updateTask = () => {
        const { currTaskId } = this.state;
        const { globalTaskObj, currentBucketData, tasks, buckets } = this.props;

        const taskFieldValidated = this.validateTaskField();

        if (taskFieldValidated) {

            updateTask(currTaskId, globalTaskObj['bucket'], globalTaskObj['task']).then(() => {
                currentBucket(currentBucketData.id, currentBucketData.name, tasks).then(() => {
                    setTasks(tasks)
                    bucketWiseTaskCount(tasks, buckets);
                    this.setState({
                        emptyDataObj: Object.assign({
                            ...this.state.emptyDataObj,
                            ['task']: false
                        })
                    })
                    this.closeTaskModal();
                })
            });
        }
    }

    deleteTask = (taskId) => {
        const { currentBucketData } = this.props;
        deleteTask(taskId).then(() => {
            const { tasks, buckets } = this.props;
            currentBucket(currentBucketData.id, currentBucketData.name, tasks).then(() => {
                Utilities.refreshTasks(tasks, buckets);
            })
        });
    }

    validateTaskField = () => {
        const { globalTaskObj } = this.props;
        let isValid = '';
        if (globalTaskObj['task'] === '') {
            this.setState({
                emptyDataObj: Object.assign({
                    ...this.state.emptyDataObj,
                    ['task']: true
                })
            })
            isValid = false;
        }

        else {
            this.setState({
                emptyDataObj: Object.assign({
                    ...this.state.emptyDataObj,
                    ['task']: false
                })
            })
            isValid = true;
        }

        return isValid;
    }

    validateFields = () => {
        const { globalTaskObj } = this.props;
        let isValid = '';
        if (globalTaskObj['bucket'] === '') {
            this.setState({
                emptyDataObj: Object.assign({
                    ...this.state.emptyDataObj,
                    ['bucket']: true
                })
            })
            isValid = false;
        }

        else if (globalTaskObj['task'] === '') {
            this.setState({
                emptyDataObj: Object.assign({
                    ...this.state.emptyDataObj,
                    ['task']: true
                })
            })
            isValid = false;
        }

        else {
            this.setState({
                emptyDataObj: Object.assign({
                    ...this.state.emptyDataObj,
                    ['bucket']: false,
                    ['task']: false
                })
            })
            isValid = true;
        }

        return isValid;
    }

    addNewTask = () => {
        const { tasks, buckets, globalTaskObj, currentBucketData } = this.props;
        const isDataValid = this.validateFields();
        if (isDataValid) {

            Utilities.addNewTask(tasks, buckets, globalTaskObj).then(() => {
                currentBucket(currentBucketData.id, currentBucketData.name, this.props.tasks).then(() => {
                    setTasks(this.props.tasks);
                    bucketWiseTaskCount(this.props.tasks, this.props.buckets);
                    this.setState({
                        emptyDataObj: Object.assign({
                            ...this.state.emptyDataObj,
                            ['bucket']: false,
                            ['task']: false
                        })
                    })
                    this.closeTaskModal();
                })
            });
        }
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
                    editAction={() => this.openTaskModal(taskId, taskTitle, bucketId, 'edit')}
                    delAction={() => this.deleteTask(taskId)}
                    status={currentBucketData.tasks[i]['completed']} />)
            }
        }

        return retArr;
    }

    render() {
        const { taskModalVisible, valuesLoaded, modalAction, bucketChange, emptyDataObj } = this.state;
        const { buckets, globalTaskObj, currentBucketData } = this.props;
        return (
            <div className="page" data-page="Bucket">
                <div className="bucketContent pageContent">
                    <div className="allTasks">
                        {this.renderTasks()}
                    </div>
                    <Modal
                        headerText={`${modalAction === 'edit' ? 'Edit' : 'Add a '} Task`}
                        subHeaderText={`${modalAction === 'add' ? "Select an existing bucket or simply type in and enter to create a new one."
                            : "You can't create a new bucket here coz you're editing :D"}`}
                        secAction={this.closeTaskModal}
                        visible={taskModalVisible}
                        primaryAction={() => modalAction === 'edit' ? this.updateTask() : this.addNewTask()}
                        content={
                            valuesLoaded ?
                                <div>
                                    <TextField
                                        hasDropdown={true}
                                        readOnly={modalAction === 'edit' ? true : false}
                                        dropdownData={buckets}
                                        className={`${emptyDataObj['bucket'] ? 'error' : ''}`}
                                        onChange={this.handleInputChange}
                                        value={
                                            bucketChange ?
                                                globalTaskObj['bucket'] :
                                                currentBucketData.name}
                                        label="Bucket"
                                        type="text"
                                        placeholder={`${emptyDataObj['bucket'] ? 'We need this' :
                                            'Where will it go?'}`} />
                                    <TextField
                                        onChange={this.handleInputChange}
                                        className={`${emptyDataObj['task'] ? 'error' : ''}`}
                                        value={globalTaskObj['task']}
                                        label="Task"
                                        type="textarea"
                                        placeholder={`${emptyDataObj['task'] ? 'Forgetting something?' :
                                            "What's on your mind?"}`} />
                                </div>
                                : null
                        }
                        primaryBtnText={`Set Sail!`} />
                </div>
                <Footer showBtn={true} action={() => this.openTaskModal('', '', currentBucketData.id, 'add')} />
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
        tasks: taskStore.tasks,
        buckets: bucketStore.buckets,
        globalTaskObj: globalStore.globalTaskObj
    }
}

export default connect(mapStateToProps)(Bucket);