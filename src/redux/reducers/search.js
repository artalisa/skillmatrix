import init from '../init';

export default function search(state, action) {
    // sloppily copying the old state here, so we never mutate it
    var newState = Object.assign({}, state);

    switch(action.type) {
        case 'SEARCH_GETSKILLS':
            newState.searchSuggestions = action.searchSuggestions;
            return newState;
        case 'SEARCH_GETUSERS':
            newState.users = action.users;
            return newState;
        default: return state || init().search.users;
    }
};