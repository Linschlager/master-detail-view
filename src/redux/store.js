import composeMiddleware, {logger, thunk} from './tools/middleware';
import rootReducer from './reducer';
import {createStore} from './tools/createStore';
import {addTodo} from './actions';

// THE State object.
const store = createStore({
  selectedTodo: undefined,
  todos: {
    ids: [],
    byId: {},
  },
},
rootReducer,
composeMiddleware(thunk, logger));

store.dispatch(addTodo('first todo'));
store.dispatch(addTodo('second todo'));
store.dispatch(addTodo('third todo'));

export default store;
