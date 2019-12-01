
import dataStore from '../store';

//Add new Bucket
export const ADD_BUCKET = 'ADD_BUCKET';
export async function addBucket(id, bucketName) {
    await dataStore.dispatch({
        type: ADD_BUCKET,
        id,
        bucketName
    })
}