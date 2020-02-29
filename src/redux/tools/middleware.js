export const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log('before', store.getState());
  console.log('action', action);
  const result = next(action);
  console.log('after', result);
  console.groupEnd();
  return result;
};

export const thunk = ({getState, dispatch}) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(next, getState);
  }
  return next(action);
};

// Inspired by naïve implementation at https://redux.js.org/advanced/middleware/
const composeMiddleware = (...middlewares) => (store) => {
  let runningDispatch = store.dispatch;
  [...middlewares]
      .reverse()
      .forEach((middleware) =>
        runningDispatch = middleware(store)(runningDispatch),
      );
  return runningDispatch;
};

export default composeMiddleware;
