
import React, { Component } from 'react';
import './HomeContent.css'
import Button from '../../Common/Button/Button';
import { Icon } from '@iconify/react';
import folderMinus from '@iconify/icons-feather/folder-minus';
import TextField from '../../Common/TextField/TextField';
import Modal from '../../Common/Modal/Modal';

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
                    : null}

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