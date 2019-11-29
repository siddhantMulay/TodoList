
import dataStore from '../store';

//Add new Task
export const ADD_TASK = 'ADD_TASK';
export async function addTask(obj) {
    await dataStore.dispatch({
        type: ADD_TASK,
        obj
    })
}

//Mark task as complete/incomplete
export const TOGGLE_TASK_STATUS = 'TOGGLE_TASK_STATUS';
export async function toggleTaskStatus(id, status) {
    await dataStore.dispatch({
        type: TOGGLE_TASK_STATUS,
        id,
        status
    })
}