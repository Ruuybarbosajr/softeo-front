import fetch from '.';

export default async (data) => fetch.post('/service/create', data, {
  headers: {
    authorization: localStorage.getItem('token')
  }
});