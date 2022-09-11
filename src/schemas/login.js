import * as yup from 'yup';

const schemaUsername = yup.string().min(5).required();
const schemaPassword = yup.string().min(6).required();

export default async (objVerify) => {
  return {
    username: await schemaUsername.isValid(objVerify.username),
    password: await schemaPassword.isValid(objVerify.password)
  };
};