import fetch from '.';

export default async (data) => fetch.post('/client/create', data, {
  headers: {
    authorization: localStorage.getItem('token')
  }
});
