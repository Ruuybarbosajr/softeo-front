import * as yup from 'yup';

const schemaName = yup.string().min(2).required();
const schemaEmail = yup.string().email().required();
const schemaTel = yup.string().length(11).required();

export default async (objVerify) => {
  return {
    name: await schemaName.isValid(objVerify.name),
    email: await schemaEmail.isValid(objVerify.email),
    tel: await schemaTel.isValid(objVerify.tel)
  };
};