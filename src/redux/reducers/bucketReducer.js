
import {
    GET_ALL_BUCKETS,
    ADD_BUCKET
} from '../actions/bucketActions';

const initialState = {
    buckets: []
};

function bucketReducer(state = initialState, action) {
    switch (action.type) {

        case GET_ALL_BUCKETS:
           
            return {
                ...state,
                buckets: currBuckets
            };

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