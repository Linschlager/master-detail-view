// Rudimentary implementation of redux's combineReducer function
const combineReducers = (reducers) => (state, action) => (
  Object
    .entries(reducers)
    .reduce((map, [key, reducer]) => ({
      ...map,
      [key]: reducer(state[key], action),
    }), {})
);
export default combineReducers;
