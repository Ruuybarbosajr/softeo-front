import * as yup from 'yup';

const schemaName = yup.string().min(2).required();
const schemaPrice = yup.number().min(1).required();
const schemaMaxInstallments = yup.number().min(1).required();

export default async (objVerify) => {
  return {
    name: await schemaName.isValid(objVerify.name),
    price: await schemaPrice.isValid(objVerify.price),
    maxInstallments: await schemaMaxInstallments.isValid(objVerify.maxInstallments)
  };
};