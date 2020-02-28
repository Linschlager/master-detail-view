import createInput from "./input";

const renderedDetailView = document.createElement('div');

let titleInput = createInput({ placeholder: 'Title' });
let contentInput = createInput({ placeholder: 'Content' });

export const update = ({ selectedItem, onChange }) => {
  if (selectedItem.id === undefined) { // Disable if nothing is selected
    titleInput.update({ disabled: true, title: 'Please select a todo first' });
    contentInput.update({ disabled: true, title: 'Please select a todo first' });
  } else {
    titleInput.update({ disabled: false, title: '' });
    contentInput.update({ disabled: false, title: '' });
  }

  if (onChange !== undefined) {
    titleInput.update({ onChange: (ev) => onChange({ title: ev.target.value }) });
    contentInput.update({ onChange: (ev) => onChange({ content: ev.target.value }) });
  }

  titleInput.update({ value: selectedItem.title || '' });
  contentInput.update({ value: selectedItem.content || '' })
};

export const mount = (node) => (initialProps) => {
  titleInput.mount(renderedDetailView);
  contentInput.mount(renderedDetailView);
  update(initialProps);
  node.appendChild(renderedDetailView);
};
