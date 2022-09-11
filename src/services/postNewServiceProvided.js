import fetch from '.';

export default async (data) => fetch.post('/service-provided/create', data, {
  headers: {
    authorization: localStorage.getItem('token')
  }
});