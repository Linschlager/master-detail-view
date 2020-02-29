import createList from './components/listview';
import {
  mount as mountDetailsView,
  update as updateDetailsView,
} from './components/detailsView';

import store from './redux/store';
import {
  addTodo,
  deleteTodo,
  selectTodo,
  toggleTodo,
  updateTodo,
} from './redux/actions';
import createInput from './components/input';

(() => {
  const appRoot = document.createElement('div');
  appRoot.id = 'app-root';

  setupInput: {
    try {
      const input = createInput({
        placeholder: 'Create your first todo',
      });
      input.mount(appRoot);
      const changeHandler = (event) => {
        if (event.target.value.length > 0) {
          store.dispatch(addTodo(event.target.value));
          input.update({value: ''}); // Clear input field
        }
      };
      input.update({onChange: changeHandler}); // Attach change listener
    } catch (e) {
      break setupInput;
    }
  }
  setupListView: {
    try {
      const handleSelect = (selectedId) => {
        store.dispatch(selectTodo(selectedId));
      };
      const handleDelete = (listItemId) => {
        store.dispatch(deleteTodo(listItemId));
      };
      const handleToggle = (listItemId, overrideState) => {
        store.dispatch(toggleTodo(listItemId, overrideState));
      };
      const list = createList({
        items: store.getState().todos,
        selectedTodo: store.getState().selectedTodo,
        onSelectionChange: handleSelect,
        onToggle: handleToggle,
        onDelete: handleDelete,
      });
      const unsubscribe = store.subscribe((store) => {
        list.update({items: store.todos, selectedTodo: store.selectedTodo});
      });
      document.addEventListener('close', unsubscribe);
      list.mount(appRoot);
    } catch (e) {
      break setupListView;
    }
  }
  setupDetailsView: {
    try {
      const handleChange = (changedItem) => {
        store.dispatch(updateTodo(changedItem));
      };

      const unsubscribe = store.subscribe((newStore, oldStore) => {
        // Check if rerender is necessary
        if (newStore.selectedTodo !== oldStore.selectedTodo ||
          oldStore.todos.byId[newStore.selectedTodo] !==
          newStore.todos.byId[newStore.selectedTodo]) {
          updateDetailsView({
            selectedTodo: newStore.todos.byId[newStore.selectedTodo],
          });
        }
      });
      document.addEventListener('close', unsubscribe);

      mountDetailsView(appRoot)({selectedItem: {}, onChange: handleChange});
    } catch (e) {
      break setupDetailsView;
    }
  }

  document.body.appendChild(appRoot); // Setup app-root-node
})();
