import { mount as mountListView, update as updateListView } from './components/listview';
import { mount as mountInputField, update as updateInputField } from './components/inputField';
import { mount as mountDetailsView, update as updateDetailsView } from './components/detailsView';
import store from "./redux/store";
import { addTodo, selectTodo, updateTodo } from "./redux/actions";


const appRoot = document.createElement('div');
appRoot.id = 'app-root';
document.body.appendChild(appRoot); // Setup app-root-node

renderInputField();
renderListView();
renderDetailView();

function renderInputField() {
  const blurHandler = event => {
    if (event.target.value.length > 0) {
      store.dispatch(addTodo(event.target.value));
      updateInputField({value: ''}); // Clear input field
    }
  };
  let value = '';
  const changeChandler = event => {
    value = event.target.value;
    updateInputField({ value });
  };
  mountInputField(appRoot)({ onBlur: blurHandler, onChange: changeChandler, value });
}

function renderListView() {
  const handleSelect = (selectedId) => {
    store.dispatch(selectTodo(selectedId))
  };
  const unsubscribe = store.subscribe(store => {
    updateListView({ list: store.todos, selected: store.selectedTodo })
  });
  document.addEventListener('close', unsubscribe);
  mountListView(appRoot)({ list: { ids: [], byId: {}}, onClick: handleSelect });
}

function renderDetailView() {
  const handleChange = (changedItem) => {
    store.dispatch(updateTodo(changedItem));
  };

  const unsubscribe = store.subscribe((newStore, oldStore) => {
    // Check if rerender is necessary
    if (newStore.selectedTodo !== oldStore.selectedTodo
      || oldStore.todos.byId[newStore.selectedTodo] !== newStore.todos.byId[newStore.selectedTodo]) {
      updateDetailsView({ selectedItem: newStore.todos.byId[newStore.selectedTodo] })
    }
  });
  document.addEventListener('close', unsubscribe);

  mountDetailsView(appRoot)({ selectedItem: {}, onChange: handleChange });
}
