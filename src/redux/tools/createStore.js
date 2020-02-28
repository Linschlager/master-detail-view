export const createStore = (initialStore, rootReducer, middleware) => {
  // Subscription part
  const subscribers = [];
  const subscribe = (fn) => {
    const length = subscribers.push(fn);
    return () => { // Return cheaper unsubscribe function
      subscribers.splice(length-1,1);
    };
  };

  // State Management
  let state = initialStore;
  const getState = () => state;
  const directDispatch = action => {
    if (action) { // Test TODO remove
      const oldState = state;
      state = rootReducer(getState(), action);
      subscribers.forEach(subscriber => subscriber(state, oldState)); // Notify all subscribers
    }
    return state;
  };
  const boundMiddleware = middleware({ getState, dispatch: directDispatch });
  const dispatch = action => directDispatch(boundMiddleware(action));
  return { getState, dispatch, subscribe };
};
