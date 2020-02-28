const input = document.createElement('input');


export const update = ({ onBlur, onChange, value, placeholder }) => {
  if (onBlur !== undefined) input.onblur = onBlur;
  if (onChange !== undefined) {
    input.onkeydown = event => {
      onChange(event);
      if (event.key === 'Enter') input.onblur(event);
    }
  }
  if (value !== undefined) input.value = value;
  if (placeholder !== undefined) input.placeholder = placeholder;
  return (input);
};

export const mount = (node) => (initialProps) => {
  update(initialProps);
  node.appendChild(input);
};
