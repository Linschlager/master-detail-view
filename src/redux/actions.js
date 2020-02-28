import { ADD_TODO, SELECT_TODO, UPDATE_TODO } from "./consts";
import uuid from "../common/uuid";

// Internal Action creators
const todoAdd = (title) => {
  const id = uuid();
  return {
    type: ADD_TODO,
    payload: {
      id,
      title,
    }
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
    }
  };
};

// External Actions
export const addTodo = (title) => dispatch => {
  dispatch(todoAdd(title));
};

export const selectTodo = (selectedId) => dispatch => {
  dispatch(todoSelect());
};

export const updateTodo = (id, changedData) => dispatch => {
  dispatch(todoUpdate(id, changedData));
};
