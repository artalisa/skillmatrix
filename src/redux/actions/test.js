export default {
    testAction: function(state) {
        // here we take advantage of Redux-thunk; instead of returning an object describing an action,
        // we return a function that takes dispatch and getState as arguments. This function can then
        // invoke dispatch, now or later using setTimeout or similar.
        return function(dispatch, getState){
            dispatch({type:'TEST_TSTACTION', test:state});
            setTimeout(function(){
                dispatch({type:'TEST_TSTACTION',test:'Timed state: '+state});
            },2000);
        }
    }
}