
import {
    ADD_TASK
} from '../actions/taskActions';

const initialState = {
    tasks: []
};

function taskReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
            };
        
        default:
            return state;
    }

}

export default taskReducer;