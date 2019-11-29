
import React, { Component } from 'react';
import { Icon } from '@iconify/react';
import folderMinus from '@iconify/icons-feather/folder-minus';
import TextField from '../components/Common/TextField/TextField';
import Modal from '../components/Common/Modal/Modal';

class Bucket extends Component {

    render() {
        const { emptyState,
            taskModalVisible,
            openTaskModal,
            handleInputChange,
            closeTaskModal } = this.props;
        return (
            <div className="bucketContent pageContent">
                Yo!
                <Modal
                    headerText={`Edit Task`}
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

export default Bucket;