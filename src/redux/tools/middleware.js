export const logger = store => next => action => {
  console.group(action.type);
  console.log('before', store);
  console.log('action', action);
  const result = next(action);
  console.log('after', result);
  console.groupEnd();
  return result;
};

export const thunk = store => next => action => {
  if (typeof action === 'function') {
    return action(next);
  }
  return next(action);
};

// Inspired by naïve implementation at https://redux.js.org/advanced/middleware/
const composeMiddleware = ([store, directDispatch], dispatch, middlewares) => {
  let runningDispatch = dispatch;
  [...middlewares].reverse().forEach(middleware => runningDispatch = middleware(store, directDispatch)(runningDispatch));
  console.log(runningDispatch);
  return runningDispatch;
};

export default composeMiddleware;
