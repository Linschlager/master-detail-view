const createList = (props) => {
  const internalListRoot = document.createElement('ul');
  let changeHandler = () => {};
  let deleteHandler = () => {};
  const update = ({ items, onSelectionChange, selectedItem, onDelete }) => {
    if (onSelectionChange !== undefined) {
      // Update changeHandler and changeHandler on all children
      changeHandler = id => event => onSelectionChange(id);
      for (const childNode of internalListRoot.children) {
        childNode.firstChild.onclick = changeHandler(childNode.id);
      }
    }
    if (onDelete !== undefined) {
      // Update deleteHandler and deleteHandler on all children
      deleteHandler = id => event => onDelete(id);
      for (const childNode of internalListRoot.children) {
        childNode.firstChild.nextSibling.onclick = deleteHandler(childNode.id);
      }
    }

    // Cleanup of deleted nodes
    for (const element of internalListRoot.children) {
      if (!items.ids.includes(element.id)) {
        element.remove();
      }
    }
    items.ids.forEach(listItemId => {
      const existingItem = internalListRoot.children.namedItem(listItemId);
      if (!existingItem) {
        const listNode = document.createElement('li');
        listNode.id = listItemId; // To let it be found afterwards

        const link = document.createElement('a');
        link.href = '#';
        link.onclick = changeHandler(listItemId);
        link.innerText = items.byId[listItemId].title;
        listNode.appendChild(link);

        const deleteButton = document.createElement('button');
        deleteButton.onclick = deleteHandler(listItemId);
        deleteButton.innerHTML = '&cross;';
        listNode.appendChild(deleteButton);

        internalListRoot.appendChild(listNode);
      } else {
        // If it's selected but doesn't have the selected class yet
        if (existingItem.id === selectedItem && !existingItem.className.includes('selected')) {
          existingItem.className = "selected";
        }
        // If it's no longer selected but still has the selected class
        if (existingItem.id !== selectedItem && existingItem.className.includes('selected')) {
          existingItem.className = "";
        }
        // If the text content is not up to date
        if (existingItem.firstChild.innerText !== items.byId[listItemId].title) {
          existingItem.firstChild.innerText = items.byId[listItemId].title;
        }
      }
    });
  };
  const mount = node => {
    console.log(node, props);
    update(props);
    node.appendChild(internalListRoot);
  };
  return { mount, update };
};

export default createList;
