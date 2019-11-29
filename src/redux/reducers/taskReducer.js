
import {
    ADD_TASK,
    TOGGLE_TASK_STATUS
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
            
            console.log(allTasks)

            return {
                ...state,
                //tasks: currTasks
            };

        default:
            return state;
    }

}

export default taskReducer;