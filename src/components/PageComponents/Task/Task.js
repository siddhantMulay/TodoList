
import React, { Component } from 'react';
import { Icon } from '@iconify/react';
import edit3 from '@iconify/icons-feather/edit-3';
import trash2 from '@iconify/icons-feather/trash-2';
import './Task.css';

class Task extends Component {

    handleCheck = (taskId, e) => {
        const { onChange } = this.props;
        onChange(taskId, e.currentTarget.checked)
    }

    render() {
        const { taskText,
            taskId,
            editAction,
            delAction,
            status,
            className
        } = this.props;
        return (
            <div className={`task ${className}`}>
                <div className={`taskText`} /*onClick={() => this.handleCheck(taskText)}*/>
                    <input type="checkbox"
                        onChange={(e) => this.handleCheck(taskId, e)}
                        value={taskText}
                        checked={status}
                    />
                    <span>{taskText}</span>
                </div>
                <div className="taskActions">
                    <Icon icon={edit3} onClick={editAction} className="taskIcon" />
                    <Icon icon={trash2} onClick={delAction} className="taskIcon" />
                </div>
            </div>
        )
    }
}

export default Task;