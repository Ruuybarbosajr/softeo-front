export default (objForVerify) => {
  return Object.values(objForVerify).every((value) => value);
};