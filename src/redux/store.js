
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

const dataStore = createStore(rootReducer);
export default dataStore;