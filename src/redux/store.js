import composeMiddleware, {logger, thunk} from './tools/middleware';
import rootReducer from './reducer';
import {createStore} from './tools/createStore';

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

export default store;
