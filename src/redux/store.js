import composeMiddleware, { logger, thunk } from "./tools/middleware";
import rootReducer from "./reducer";
import { createStore } from "./tools/createStore";

// THE State object.
let store = createStore({
    selectedItem: null,
    todos: {
      ids: [],
      byId: {},
    }
  },
  rootReducer,
  composeMiddleware(thunk, logger));

export default store;
