const createDiv = (initialProps) => {
  const internalRootElement = document.createElement('div');

  const update = ({expectedProp, ...rest}) => {
    // directly pass unlisted properties to native input
    Object.entries(rest).forEach(([key, value]) => {
      internalRootElement[key] = value;
    });
  };

  const mount = (node) => {
    update(initialProps);
    node.appendChild(internalRootElement);
  };

  const remove = () => {
    node.removeChild(internalRootElement);
  };

  return {mount, update, remove};
};
export default createDiv;
