
import {
    GLOBAL_TASK_OBJ,
    BUCKET_WISE_TASK_COUNT,
    CURRENT_BUCKET,
    SET_ALL_TASKS
} from '../actions/globalActions';

const initialState = {
    globalTaskObj: {
        'bucket': '',
        'task': ''
    },
    bucketTaskCount: [],
    currentBucket: {},
    allTasks: []
};

function globalReducer(state = initialState, action) {
    switch (action.type) {
        case GLOBAL_TASK_OBJ:

            return {
                ...state,
                globalTaskObj: Object.assign({}, state.globalTaskObj, {
                    [action.key]: action.value
                })
            };

        case BUCKET_WISE_TASK_COUNT:

            return {
                ...state,
                bucketTaskCount: action.retArr
            };

        case CURRENT_BUCKET:
            return {
                ...state,
                currentBucket: action.retObj
            };

        case SET_ALL_TASKS:

            return {
                ...state,
                allTasks: action.tasks
            };

        default:
            return state;
    }

}

export default globalReducer;