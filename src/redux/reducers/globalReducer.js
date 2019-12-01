
import {
    GLOBAL_TASK_OBJ,
    BUCKET_WISE_TASK_COUNT,
    CURRENT_BUCKET,
    SET_ALL_TASKS,
    CHANGE_THEME
} from '../actions/globalActions';

import { lightTheme, darkTheme } from '../../common/Theme';

const initialState = {
    globalTaskObj: {
        'bucket': '',
        'task': ''
    },
    bucketTaskCount: [],
    currentBucket: {},
    allTasks: [],
    theme: { 'style': darkTheme, 'theme': 'dark' }
}

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

        case CHANGE_THEME:

            let themeObj = {};
            if (action.theme === 'dark') {
                themeObj = darkTheme;
            }
            else {
                themeObj = lightTheme;
            }
            return {
                ...state,
                theme: Object.assign({}, state.theme, {
                    'style': themeObj,
                    'theme': action.theme
                })
            };

        default:
            return state;
    }

}

export default globalReducer;