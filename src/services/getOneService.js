import fetch from '.';

export default async (id) => fetch.get(`/service/${id}`, {
  headers: {
    authorization: localStorage.getItem('token')
  }
});