import reducer from "./reducer";
import composeMiddleware, { logger, thunk } from "./tools/middleware";

// THE State object.
let store = {
  selectedItem: null,
  todos: {
    ids: [],
    byId: {},
  }
};

const subscribers = [];
const directDispatch = action => store = reducer(store, action);
const internalDispatch =
  composeMiddleware([store, directDispatch], directDispatch, [thunk, logger]);

export const dispatchAction = (action) => {
  const oldStore = store;
  store = internalDispatch(action);
  console.warn(store);
  subscribers.forEach(subscriber => subscriber(store, oldStore)); // Notify all subscribers
};
/*
// In case something needed to unsubscribe somewhere else than it subscribed
export const unsubscribe = (fn) => {
  const index = subscribers.indexOf(fn);
  subscribers.splice(index,1);
};
*/

export const subscribe = (fn) => {
  const length = subscribers.push(fn);
  return () => { // Return cheaper unsubscribe function
    subscribers.splice(length-1,1);
  };
};
