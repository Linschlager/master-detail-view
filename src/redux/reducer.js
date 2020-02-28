import { ADD_TODO, DELETE_TODO, SELECT_TODO, UPDATE_TODO } from "./consts";
import combineReducers from "./tools/combineReducers";

/**
 * Keeping an array of all ids
 * @param state Last
 * @param {{type: String, payload: { id: String, title: String, content: String }}} action
 * @returns {String[]} Array of all ids
 */
const ids = (state, action) => {
  switch(action.type) {
    case ADD_TODO:
      return [...state, action.payload.id];
    case DELETE_TODO:
      return state.filter(id => id !== action.payload);
    default:
      return state;
  }
};

/**
 * maps id's to their data
 * @param state Last
 * @param {{type: String, payload: { id: String!, title: String, content: String }}} action
 * @returns {{[String]: {id: String, title: String, content: String}}} Array of all ids
 */
const byId = (state, action) => {
  switch(action.type) {
    case ADD_TODO:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case UPDATE_TODO:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload // Merge changes into item
        },
      };
    case DELETE_TODO:
      const {[action.payload]: removedItem, ...newState} = state; // Cleanly remove item from state
      return newState;
    default:
      return state;
  }
};

const todos = combineReducers({
  ids,
  byId,
});

/**
 * id of the currently selected item
 * @param state Last
 * @param {{type: String, payload: String}} action
 * @returns {String} id of selected list
 */
const selected = (state, action) => {
  switch (action.type) {
    case SELECT_TODO:
      return action.payload;
    case DELETE_TODO:
      if (action.payload === state)
        return null;
      return state;
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  todos,
  selectedTodo: selected,
})

export default rootReducer;
