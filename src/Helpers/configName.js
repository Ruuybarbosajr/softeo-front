export default (name) => {
  const fullName = name.split(' ');
  return `${fullName[0]} ${fullName[1] || ''}`;
};