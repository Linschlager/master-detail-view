const createInput = (props) => {
  const internalInput = document.createElement('input');
  let changeHandler = undefined;
  let keydownHandler = undefined;
  const update = ({ onChange, ...rest }) => {
    if (onChange !== undefined) {
      // Remove old handler and add new one
      if (changeHandler !== undefined) {
        internalInput.removeEventListener('blur', changeHandler)
      }
      changeHandler = onChange;
      internalInput.addEventListener('blur', changeHandler);

      // Remove old handler and add new one
      if (keydownHandler !== undefined) {
        internalInput.removeEventListener('keydown', keydownHandler);
      }
      keydownHandler = (event) => {
        if (event.key === 'Enter') onChange(event);
      };
      internalInput.addEventListener('keydown', keydownHandler);
    }
    Object.entries(rest).forEach(([key, value]) => { // directly pass unlisted properties to native input
      internalInput[key] = value;
    });
  };

  const mount = (node) => {
    update(props);
    node.appendChild(internalInput);
  };

  return { mount, update };
};

export default createInput;
