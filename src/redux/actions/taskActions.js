
import dataStore from '../store';

//Add new Task
export const ADD_TASK = 'ADD_TASK';
export async function addTask(data) {
    // let json = {};
    // json = await dataActions.getAdminConfig(doc);
    await dataStore.dispatch({
        type: ADD_TASK,
        data
    })
}