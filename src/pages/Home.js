
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeContent from '../components/PageComponents/HomeContent/HomeContent';
import { globalTaskObj, bucketWiseTaskCount } from '../redux/actions/globalActions';
import { withRouter } from 'react-router-dom'
import Utilities from '../common/Utilities';
import Footer from '../components/Common/Footer/Footer';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskModalVisible: false,
            valuesLoaded: false,
            emptyDataObj: {}
        }
    }

    openTaskModal = () => {
        this.setState({
            taskModalVisible: true
        }, () => {
            this.setState({
                valuesLoaded: true
            })
        })
    }

    closeTaskModal = () => {
        this.setState({
            taskModalVisible: false,
            valuesLoaded: false
        }, () => {
            const { tasks, buckets } = this.props;
            bucketWiseTaskCount(tasks, buckets);
            globalTaskObj('', 'bucket')
            globalTaskObj('', 'task')
        })
    }

    handleInputChange = (value, callFrom) => {
        let temp = callFrom.toLowerCase();

        if (temp === 'dropdown') {
            temp = 'bucket'
        }
        this.setState({
            emptyDataObj: Object.assign({
                ...this.state.emptyDataObj,
                [temp]: false
            })
        })
        globalTaskObj(value, temp)
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
        const { tasks, buckets, globalTaskObj } = this.props;

        const isDataValid = this.validateFields();

        if (isDataValid) {
            Utilities.addNewTask(tasks, buckets, globalTaskObj).then(() => {
                this.setState({
                    emptyDataObj: Object.assign({
                        ...this.state.emptyDataObj,
                        ['bucket']: false,
                        ['task']: false
                    })
                })
                this.closeTaskModal();
            })
        }
    }

    render() {
        const { taskModalVisible, valuesLoaded, emptyDataObj } = this.state;
        const { buckets } = this.props;
        const emptyState = buckets.length > 0 ? false : true;
        return (
            <div className="page" data-page="Home">
                <HomeContent
                    openTaskModal={this.openTaskModal}
                    closeTaskModal={this.closeTaskModal}
                    emptyState={emptyState}
                    loaded={valuesLoaded}
                    isValid={emptyDataObj}
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
        tasks: JSON.parse(localStorage.getItem('tasks')) || taskStore.tasks,
        buckets: JSON.parse(localStorage.getItem('buckets')) || bucketStore.buckets,
        globalTaskObj: globalStore.globalTaskObj
    }
}

export default withRouter(connect(mapStateToProps)(Home));