export default () => {
  const randomNumber = Math.random().toString(16);
  return btoa(randomNumber);
};
