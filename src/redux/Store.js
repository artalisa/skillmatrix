import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import init from './init';
import testReducer from './reducers/test';

const rootReducer = combineReducers({
    test: testReducer
});

export default applyMiddleware(thunk)(createStore)(rootReducer, init())