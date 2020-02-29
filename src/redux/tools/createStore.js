export const createStore = (initialStore, rootReducer, middleware) => {
  // State Management
  let currentState = initialStore;
  // Subscription part
  const subscribers = [];
  const subscribe = (fn) => {
    const length = subscribers.push(fn);
    return () => { // Return cheaper unsubscribe function
      subscribers.splice(length-1,1);
    };
  };

  // const actionHistory = []; // Required to regenerate the store based on past actions
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
  const directDispatch = action => {
    if (action) { // Test TODO remove
      const oldState = currentState
      //actionHistory.push(action); // Required to regenerate the store based on past actions
      currentState = rootReducer(currentState, action); // Overwrite current State. Not required if state is regenerated
      subscribers.forEach(subscriber => subscriber(currentState, oldState)); // Notify all subscribers
    }
    return getState();
  };
  const boundMiddleware = middleware({ getState, dispatch: directDispatch });
  const dispatch = action => directDispatch(boundMiddleware(action));
  return { getState, dispatch, subscribe };
};
