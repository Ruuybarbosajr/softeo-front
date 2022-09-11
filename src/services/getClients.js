import fetch from '.';

export default async () => fetch.get('/client/all', {
  headers: {
    authorization: localStorage.getItem('token')
  }
});