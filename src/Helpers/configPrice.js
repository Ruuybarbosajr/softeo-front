export default (price) => {
  const formato = { style: 'currency', currency: 'BRL' };
  return price.toLocaleString('pt-BR', formato);
};