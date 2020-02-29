const createCheckbox = (props) => {
  const internalInput = document.createElement('input');
  internalInput.type = 'checkbox';

  let changeHandler = undefined;
  const update = ({onChange, ...rest}) => {
    if (onChange !== undefined) {
      // Remove old handler and add new one
      if (changeHandler !== undefined) {
        internalInput.removeEventListener('change', changeHandler);
      }
      changeHandler = onChange;
      internalInput.addEventListener('change', changeHandler);
    }
    // directly pass unlisted properties to native input
    Object.entries(rest).forEach(([key, value]) => {
      internalInput[key] = value;
    });
  };

  const mount = (node) => {
    update(props);
    node.appendChild(internalInput);
  };

  return {mount, update};
};

export default createCheckbox;
