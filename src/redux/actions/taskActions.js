
import dataStore from '../store';

//Add new Task
export const ADD_TASK = 'ADD_TASK';
export async function addTask(obj) {
    await dataStore.dispatch({
        type: ADD_TASK,
        obj
    })
}

//Update Task
export const UPDATE_TASK = 'UPDATE_TASK';
export async function updateTask(id, bucketId, title) {
    await dataStore.dispatch({
        type: UPDATE_TASK,
        id,
        bucketId,
        title
    })
}

//Delete Task
export const DELETE_TASK = 'DELETE_TASK';
export async function deleteTask(id) {
    await dataStore.dispatch({
        type: DELETE_TASK,
        id
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