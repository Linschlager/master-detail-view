import {ACTIVATE_TODO, ADD_TODO, DELETE_TODO, FINISH_TODO, SELECT_TODO, UPDATE_TODO} from './consts';
import uuid from '../common/uuid';

// Internal Action creators
const todoAdd = (title) => {
  const id = uuid();
  return {
    type: ADD_TODO,
    payload: {
      id,
      title,
    },
  };
};

const todoSelect = (selectedId) => {
  return {
    type: SELECT_TODO,
    payload: selectedId,
  };
};

const todoUpdate = (id, changedData) => {
  return {
    type: UPDATE_TODO,
    payload: {
      id,
      ...changedData,
    },
  };
};

const todoDelete = (id) => {
  return {
    type: DELETE_TODO,
    payload: id,
  };
};

const todoFinish = (id) => {
  return {
    type: FINISH_TODO,
    payload: id,
  };
};

const todoActivate = (id) => {
  return {
    type: ACTIVATE_TODO,
    payload: id,
  };
};

// External Actions
export const addTodo = (title) => (dispatch) => {
  dispatch(todoAdd(title));
};

export const selectTodo = (selectedId) => (dispatch) => {
  dispatch(todoSelect(selectedId));
};

export const updateTodo = (changedData) => (dispatch, getState) => {
  const id = getState().selectedTodo;
  dispatch(todoUpdate(id, changedData));
};

export const deleteTodo = (listItemId) => (dispatch) => {
  dispatch(todoDelete(listItemId));
};

export const toggleTodo = (listItemId, overrideState) =>
  (dispatch, getState) => {
    let state = overrideState;
    if (state === undefined) {
      state = getState().todos.byId[listItemId].done;
    }

    if (state === true) {
      dispatch(todoActivate(listItemId));
    } else {
      dispatch(todoFinish(listItemId));
    }
  };
