
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeContent from '../components/PageComponents/HomeContent/HomeContent';
import { addTask } from '../redux/actions/taskActions';
import { addBucket } from '../redux/actions/bucketActions';
import { globalTaskObj, bucketWiseTaskCount } from '../redux/actions/globalActions';

import Footer from '../components/Common/Footer/Footer';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskModalVisible: false,
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
        }, () => {
            const { tasks, buckets } = this.props;
            bucketWiseTaskCount(tasks, buckets);
        })
    }

    handleInputChange = (value, callFrom) => {
        let temp = callFrom.toLowerCase();

        if (temp === 'autocomp') {
            temp = 'bucket'
        }
        globalTaskObj(value, temp)
    }

    addNewTask = () => {
        const { tasks, buckets, globalTaskObj } = this.props;
        const bucketId = buckets.length + 1;
        const taskID = tasks.length + 1;
        const bucketName = globalTaskObj['bucket'];
        let taskObj = { ...globalTaskObj };

        if (typeof taskObj['bucket'] === 'number') {
            taskObj['id'] = taskID;
            taskObj['completed'] = false;
            addTask(taskObj).then(() => {
                this.closeTaskModal();
            });
        }

        else {
            addBucket(bucketId, bucketName).then(() => {
                taskObj['id'] = taskID;
                taskObj['bucket'] = bucketId;
                taskObj['completed'] = false;
                addTask(taskObj).then(() => {
                    this.closeTaskModal();
                });
            });
        }
    }

    render() {
        const { taskModalVisible } = this.state;
        const { tasks, buckets, globalTaskObj } = this.props;
        const emptyState = tasks.length > 0 ? false : true;

        return (
            <div className="page" data-page="Home">
                <HomeContent
                    openTaskModal={this.openTaskModal}
                    closeTaskModal={this.closeTaskModal}
                    emptyState={emptyState}
                    primaryAction={() => this.addNewTask()}
                    handleInputChange={this.handleInputChange}
                    taskModalVisible={taskModalVisible} />


                <Footer showBtn={!emptyState} action={this.openTaskModal} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const taskStore = state.task;
    const bucketStore = state.bucket;
    const globalStore = state.global;
    return {
        tasks: taskStore.tasks,
        buckets: bucketStore.buckets,
        globalTaskObj: globalStore.globalTaskObj
    }
}

export default connect(mapStateToProps)(Home);