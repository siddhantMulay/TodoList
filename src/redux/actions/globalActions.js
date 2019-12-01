
import dataStore from '../store';

//Set bucket url based on the bucket user is viewing
export const CURRENT_BUCKET = 'CURRENT_BUCKET';
export async function currentBucket(id, name, tasks, reset) {

    let retObj = {};

    if (!reset) {
        retObj.id = id;
        retObj.name = name;
        let taskArr = [];
        let totalCount = 0;
        let compCount = 0;

        if (tasks.length > 0) {
            for (var i in tasks) {

                if (tasks[i]['bucket'] === id) {
                    totalCount = totalCount + 1;
                    retObj['total'] = totalCount;

                    if (tasks[i]['completed']) {
                        compCount = compCount + 1;
                    }
                    retObj['completed'] = compCount;
                    taskArr.push({
                        'id': tasks[i]['id'],
                        'title': tasks[i]['task'],
                        'completed': tasks[i]['completed']
                    });
                    retObj['tasks'] = taskArr;
                }
            }
        }
        else{
            retObj['total'] = 0;
            retObj['completed'] = 0;
        }
    }

    await dataStore.dispatch({
        type: CURRENT_BUCKET,
        retObj
    })
}

//Set a global task object
export const GLOBAL_TASK_OBJ = 'GLOBAL_TASK_OBJ';
export async function globalTaskObj(value, key) {
    await dataStore.dispatch({
        type: GLOBAL_TASK_OBJ,
        key,
        value
    })
}

//Set a bucket-wise task count
export const BUCKET_WISE_TASK_COUNT = 'BUCKET_WISE_TASK_COUNT';
export function bucketWiseTaskCount(tasks, buckets) {

    let retArr = [];

    for (var i in buckets) {
        let bucketId = buckets[i]['id'];
        let countObj = {};
        countObj['id'] = bucketId;
        let totalCount = 0;
        let compCount = 0;

        if (tasks.length > 0) {

            for (var j in tasks) {

                if (tasks[j]['bucket'] === bucketId) {
                    totalCount = totalCount + 1;
                    countObj['total'] = totalCount;

                    if (tasks[j]['completed']) {
                        compCount = compCount + 1;
                    }
                    countObj['completed'] = compCount;
                }
            }
        }

        else {
            countObj['total'] = 0;
            countObj['completed'] = 0;
        }

        retArr.push(countObj);
    }

    dataStore.dispatch({
        type: BUCKET_WISE_TASK_COUNT,
        retArr
    })
}

//Set an extra copy of tasks
export const SET_ALL_TASKS = 'SET_ALL_TASKS';
export async function setTasks(tasks) {
    await dataStore.dispatch({
        type: SET_ALL_TASKS,
        tasks
    })
}