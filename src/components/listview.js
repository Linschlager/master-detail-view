import createCheckbox from './checkbox';

const createList = (props) => {
  const internalListRoot = document.createElement('ul');
  let changeHandler = () => {};
  let deleteHandler = () => {};
  let toggleHandler = () => {};
  const update = ({
    items,
    onSelectionChange,
    selectedTodo,
    onDelete,
    onToggle,
  }) => {
    if (onSelectionChange !== undefined) {
      // Update changeHandler and changeHandler on all children
      changeHandler = (id) => (event) => onSelectionChange(id);
      for (const childNode of internalListRoot.children) {
        childNode.children[1].onclick = changeHandler(childNode.id);
      }
    }
    if (onDelete !== undefined) {
      // Update deleteHandler and deleteHandler on all children
      deleteHandler = (id) => (event) => onDelete(id);
      for (const childNode of internalListRoot.children) {
        childNode.children[0].onclick = deleteHandler(childNode.id);
      }
    }
    if (onToggle !== undefined) { // TODO change
      // Update deleteHandler and deleteHandler on all children
      toggleHandler = (id) => (event) => onToggle(id);
      for (const childNode of internalListRoot.children) {
        childNode.children[2].onchange = (event) =>
          toggleHandler(childNode.id, event.target.checked);
      }
    }

    // Cleanup of deleted nodes
    for (const element of internalListRoot.children) {
      if (!items.ids.includes(element.id)) {
        element.remove();
      }
    }
    items.ids.forEach((listItemId) => {
      const existingItem = internalListRoot.children.namedItem(listItemId);
      if (!existingItem) {
        const listNode = document.createElement('li');
        listNode.id = listItemId; // To let it be found afterwards

        const deleteButton = document.createElement('button');
        deleteButton.onclick = deleteHandler(listItemId);
        deleteButton.innerHTML = '&cross;';
        listNode.appendChild(deleteButton);

        const link = document.createElement('a');
        link.href = '#';
        link.onclick = changeHandler(listItemId);
        link.innerText = items.byId[listItemId].title;
        listNode.appendChild(link);

        /*
        const toggleCheckbox = document.createElement('input');
        toggleCheckbox.type = 'checkbox';
        toggleCheckbox.onchange = (event) =>
          toggleHandler(listItemId, event.target.checked);
        listNode.appendChild(toggleCheckbox);
        */
        const toggleCheckbox = createCheckbox({
          onChange: event => toggleHandler(listItemId, event.target.checked)(),
        });
        toggleCheckbox.mount(listNode);

        internalListRoot.appendChild(listNode);
      } else {
        // If it's selected but doesn't have the selected class yet
        if (existingItem.id === selectedTodo &&
          !existingItem.classList.contains('selected')) {
          existingItem.classList.add('selected');
        }
        // If it's no longer selected but still has the selected class
        if (existingItem.id !== selectedTodo &&
          existingItem.classList.contains('selected')) {
          existingItem.classList.remove('selected');
        }
        // If it's done but doesn't have the selected class yet
        if (items.byId[listItemId].done === true &&
          !existingItem.classList.contains('done')) {
          existingItem.classList.add('done');
        }
        // If it's no longer done but still has the selected class
        if (items.byId[listItemId].done === false &&
          existingItem.classList.contains('done')) {
          existingItem.classList.remove('done');
        }
        // If the text content is not up to date
        if (existingItem.children[1].innerText !==
          items.byId[listItemId].title) {
          existingItem.children[1].innerText = items.byId[listItemId].title;
        }
      }
    });
  };
  const mount = (node) => {
    console.log(node, props);
    update(props);
    node.appendChild(internalListRoot);
  };
  return {mount, update};
};

export default createList;
