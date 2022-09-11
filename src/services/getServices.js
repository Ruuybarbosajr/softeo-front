import fetch from '.';

export default async () => fetch.get('/service/all', {
  headers: {
    authorization: localStorage.getItem('token')
  }
});