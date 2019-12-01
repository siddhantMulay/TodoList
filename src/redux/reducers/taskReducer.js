
import {
    ADD_TASK,
    TOGGLE_TASK_STATUS,
    UPDATE_TASK,
    DELETE_TASK
} from '../actions/taskActions';

const initialState = {
    tasks: []
};

function taskReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TASK:

            let currTasks = [...state.tasks];
            currTasks.push(action.obj);

            return {
                ...state,
                tasks: currTasks
            };

        case TOGGLE_TASK_STATUS:

            let allTasks = [...state.tasks];
            for (var i in allTasks) {
                if (allTasks[i]['id'] === action.id) {
                    Object.assign(allTasks[i], {
                        'completed': action.status
                    })
                }
            }

            return {
                ...state,
                tasks: allTasks
            };

        case UPDATE_TASK:

            let getAllTasks = [...state.tasks];
            for (var j in getAllTasks) {
                if (getAllTasks[j]['id'] === action.id) {
                    Object.assign(getAllTasks[j], {
                        'bucket': action.bucketId,
                        'task': action.title
                    })
                }
            }

            return {
                ...state,
                tasks: getAllTasks
            };

        case DELETE_TASK:

            let getAllCurrentTasks = [...state.tasks];
            for (var k in getAllCurrentTasks) {
                if (getAllCurrentTasks[k]['id'] === action.id) {
                    getAllCurrentTasks.splice(k, 1);
                }
            }
            return {
                ...state,
                tasks: getAllCurrentTasks
            };

        default:
            return state;
    }

}

export default taskReducer;