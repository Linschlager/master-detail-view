import createInput from './input';

const renderedDetailView = document.createElement('div');

const titleInput = createInput({placeholder: 'Title'});
const contentInput = createInput({placeholder: 'Content'});

export const update = ({selectedTodo, onChange}) => {
  if (selectedTodo) { // Disable if nothing is selected
    titleInput.update({
      disabled: false,
      title: '',
      value: selectedTodo.title || '',
    });
    contentInput.update({
      disabled: false,
      title: '',
      value: selectedTodo.content || '',
    });
  } else {
    titleInput.update({
      disabled: true,
      title: 'Please select a todo first',
    });
    contentInput.update({
      disabled: true,
      title: 'Please select a todo first',
    });
  }

  if (onChange !== undefined) {
    titleInput.update({onChange: (ev) => onChange({title: ev.target.value})});
    contentInput.update({
      onChange: (ev) => onChange({content: ev.target.value}),
    });
  }
};

export const mount = (node) => (initialProps) => {
  titleInput.mount(renderedDetailView);
  contentInput.mount(renderedDetailView);
  update(initialProps);
  node.appendChild(renderedDetailView);
};
