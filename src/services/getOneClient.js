import fetch from '.';

export default async (id) => fetch.get(`/client/${id}`, {
  headers: {
    authorization: localStorage.getItem('token')
  }
});