import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import init from './init';
import testReducer from './reducers/test';
import searchReducer from './reducers/search';

const rootReducer = combineReducers({
    test: testReducer,
    search: searchReducer
});

export default applyMiddleware(thunk)(createStore)(rootReducer, init())