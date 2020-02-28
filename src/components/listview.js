const listRoot = document.createElement('ul');

let onClickHandler;
export const update = ({ list, onClick, selected }) => {
  if (onClick !== undefined) onClickHandler = onClick;
  list.ids.forEach(listItemId => {
    let item = listRoot.children.namedItem(listItemId);
    if (!item) {
      const newItem = document.createElement('li');
      const listItemLink = document.createElement('a');
      newItem.id = listItemId;
      listItemLink.href = '#';
      listItemLink.innerText = list.byId[listItemId].title;
      listItemLink.onclick = () => onClickHandler(listItemId)
      newItem.appendChild(listItemLink);
      listRoot.appendChild(newItem);
      item = newItem;
    } else if (item.firstChild.innerText !== list.byId[listItemId].title) { // Check if mounted node needs update
        const link = item.firstChild;
        link.innerText = list.byId[listItemId].title;
        link.onclick = () => onClickHandler(listItemId)
    }
    if (listItemId !== selected && item.className.includes('selected')) {
      item.className = item.className.replace('selected', '');
    }
  });
  if (selected)
    listRoot.children.namedItem(selected).className = "selected";
};

export const mount = (node) => (initialProps) => {
  update(initialProps);
  node.appendChild(listRoot);
};
