const renderedDetailView = document.createElement('div');

const titleField = document.createElement('input');
titleField.placeholder = 'Title';
renderedDetailView.appendChild(titleField);

const contentField = document.createElement('input');
contentField.placeholder = 'Content';
renderedDetailView.appendChild(contentField);

export const update = ({ selectedItem, onChange }) => {
  if (selectedItem.id === undefined) { // Disable if nothing is selected
    titleField.disabled = true;
    titleField.title = 'Please select a todo first';
    contentField.disabled = true;
    contentField.title = 'Please select a todo first';
  } else {
    titleField.disabled = false;
    titleField.title = '';
    contentField.disabled = false;
    titleField.title = '';
  }

  if (onChange !== undefined) {
    titleField.onchange = () => onChange({ title: titleField.value});
    titleField.onkeypress = event => {
      if (event.key === 'Enter') contentField.onchange(event);
    };
    contentField.onchange = () => onChange({ content: contentField.value});
    contentField.onkeypress = event => {
      if (event.key === 'Enter') contentField.onchange(event);
    };
  }

  // Update content if necessary
  if (titleField.value !== selectedItem.title) {
    titleField.value = selectedItem.title || '';
  }
  if (contentField.value !== selectedItem.content) {
    contentField.value = selectedItem.content || '';
  }
};

export const mount = (node) => (initialProps) => {
  update(initialProps);
  node.appendChild(renderedDetailView);
};
