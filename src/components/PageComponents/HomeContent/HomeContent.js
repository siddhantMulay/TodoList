
import React, { Component } from 'react';
import './HomeContent.css'
import Button from '../../Common/Button/Button';
import { Icon } from '@iconify/react';
import folderMinus from '@iconify/icons-feather/folder-minus';
import TextField from '../../Common/TextField/TextField';
import Modal from '../../Common/Modal/Modal';
import { connect } from 'react-redux';
import BucketCard from '../BucketCard/BucketCard';
import { Link } from 'react-router-dom';
import { currentBucket } from '../../../redux/actions/globalActions';

class HomeContent extends Component {

    renderBuckets = () => {
        const { tasks, buckets, bucketTaskCount } = this.props;
        let retArr = [];
        for (var i in buckets) {

            const bucketId = buckets[i]['id'];
            const bucketName = buckets[i]['name'];
            let taskCount = 0;
            let completedTaskCount = 0;

            for (var i in bucketTaskCount) {
                if (bucketTaskCount[i]['id'] === bucketId) {
                    taskCount = bucketTaskCount[i]['total'];
                    completedTaskCount = bucketTaskCount[i]['completed'];
                }
            }

            const endpoint = bucketName.replace("[^A-Za-z0-9]+", "-").toLowerCase();

            retArr.push(
                <Link
                    to={`/bucket/${endpoint}`}
                    key={bucketId}>
                    <BucketCard
                        action={() => currentBucket(bucketId, bucketName, tasks)}
                        title={bucketName}
                        taskCount={taskCount}
                        completedTaskCount={completedTaskCount} />
                </Link>)
        }

        return retArr;
    }

    render() {
        const { emptyState,
            loaded,
            taskModalVisible,
            openTaskModal,
            primaryAction,
            handleInputChange,
            globalTaskObj,
            buckets,
            closeTaskModal } = this.props;
        return (
            <div className="homeContent pageContent">

                {emptyState ?
                    <div className="emptyState">
                        <Icon icon={folderMinus} className="emptyIcon" />
                        <div>
                            How 'bout we get started?
                        </div>
                        <Button buttonText="Add Task" action={openTaskModal} />
                    </div>
                    :
                    <div className="cards">
                        {this.renderBuckets()}
                    </div>
                }

                <Modal
                    headerText={`Add a Task`}
                    subHeaderText={`Select an existing bucket or simply type to create a new one.`}
                    secAction={closeTaskModal}
                    visible={taskModalVisible}
                    primaryAction={primaryAction}
                    content={
                        loaded ?
                            <div>
                                <TextField
                                    hasDropdown={true}
                                    dropdownData={buckets}
                                    onChange={handleInputChange}
                                    value={globalTaskObj['bucket']}
                                    label="Bucket"
                                    type="text"
                                    placeholder="Where will it go?" />
                                <TextField
                                    onChange={handleInputChange}
                                    value={globalTaskObj['task']}
                                    label="Task"
                                    type="textarea"
                                    placeholder="What's on your mind?" />
                            </div>
                            : null
                    }
                    primaryBtnText={`Set Sail!`} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const taskStore = state.task;
    const bucketStore = state.bucket;
    const globalStore = state.global;
    return {
        buckets: bucketStore.buckets,
        tasks: taskStore.tasks,
        bucketTaskCount: globalStore.bucketTaskCount,
        globalTaskObj: globalStore.globalTaskObj
    }
}

export default connect(mapStateToProps)(HomeContent);