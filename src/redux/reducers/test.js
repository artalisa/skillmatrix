import init from '../init';

export default function test(state, action) {
    // sloppily copying the old state here, so we never mutate it
    //var newState = Object.assign({}, state);

    switch(action.type) {
        case 'TEST_TSTACTION':
            return 'TestAction: '+action.test;

        default: return state || init().test;
    }
};