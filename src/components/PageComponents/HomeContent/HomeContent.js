
import React, { Component } from 'react';
import './HomeContent.css'
import Button from '../../Common/Button/Button';
import { Icon } from '@iconify/react';
import folderMinus from '@iconify/icons-feather/folder-minus';
import TextField from '../../Common/TextField/TextField';
import Modal from '../../Common/Modal/Modal';

import BucketCard from '../BucketCard/BucketCard';

class HomeContent extends Component {

    render() {
        const { emptyState,
            taskModalVisible,
            openTaskModal,
            handleInputChange,
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
                        <BucketCard
                            title="Work"
                            taskCount="2"
                            completedTaskCount="1" />
                    </div>
                }

                <Modal
                    headerText={`Add a Task`}
                    secAction={closeTaskModal}
                    visible={taskModalVisible}
                    content={
                        <div>
                            <TextField
                                autocomplete={true}
                                onChange={handleInputChange}
                                label="Where to?"
                                type="text"
                                placeholder="Enter category name" />
                            <TextField
                                onChange={handleInputChange}
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

export default HomeContent;