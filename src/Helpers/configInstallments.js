import configPrice from './configPrice';

export default (price, numberInstallments) => {
  const priceFormated = configPrice(price / numberInstallments);
  return `${numberInstallments}x de ${priceFormated}`;
};