
import {
    ADD_BUCKET
} from '../actions/bucketActions';

const initialState = {
    buckets: []
};

function bucketReducer(state = initialState, action) {
    switch (action.type) {

        case ADD_BUCKET:
            let bucketObj = {
                'id': action.id,
                'name': action.bucketName
            }

            let currBuckets = [...state.buckets];
            currBuckets.push(bucketObj);

            return {
                ...state,
                buckets: currBuckets
            };

        default:
            return state;
    }

}

export default bucketReducer;