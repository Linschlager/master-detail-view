export const createStore = (initialStore, rootReducer, middleware) => {
  // State Management
  let currentState = initialStore;
  // Subscription part
  const subscribers = [];
  const subscribe = (fn) => {
    const length = subscribers.push(fn);
    return () => { // Return cheaper unsubscribe function
      subscribers.splice(length-1, 1);
    };
  };

  // Required to regenerate the store based on past actions
  // const actionHistory = [];
  const getState = () => {
    return currentState;
    /*
    // In case at some point it's needed :)
    console.info('Regenerating Store');
    return actionHistory.reduce(((previousValue, currentValue) => {
      return rootReducer(previousValue, currentValue);
    }), initialStore);
    */
  };
  const directDispatch = (action) => {
    if (action) { // Test TODO remove
      const oldState = currentState;
      // Required to regenerate the store based on past actions
      // actionHistory.push(action);
      // Overwrite current State. Not required if state is regenerated
      currentState = rootReducer(currentState, action);
      // Notify all subscribers
      subscribers.forEach((subscriber) => subscriber(currentState, oldState));
    }
    return getState();
  };
  const boundMiddleware = middleware({getState, dispatch: directDispatch});
  const dispatch = (action) => directDispatch(boundMiddleware(action));
  return {getState, dispatch, subscribe};
};
