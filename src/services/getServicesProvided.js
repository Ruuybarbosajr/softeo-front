import fetch from '.';

export default async () => fetch.get('/service-provided/all', {
  headers: {
    authorization: localStorage.getItem('token')
  }
});