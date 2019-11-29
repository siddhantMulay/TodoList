

import { combineReducers } from 'redux';
import taskReducer from './taskReducer';
import bucketReducer from './bucketReducer';
import globalReducer from './globalReducer';

const rootReducer = combineReducers(
    {
        task: taskReducer,
        bucket: bucketReducer,
        global: globalReducer
    }
)

export default rootReducer;


