
import dataStore from '../store';

//Get all Buckets
export const GET_ALL_BUCKETS = 'GET_ALL_BUCKETS';
export async function getAllBuckets() {
    await dataStore.dispatch({
        type: GET_ALL_BUCKETS,
    })
}

//Add new Bucket
export const ADD_BUCKET = 'ADD_BUCKET';
export async function addBucket(id, bucketName) {
    await dataStore.dispatch({
        type: ADD_BUCKET,
        id,
        bucketName
    })
}