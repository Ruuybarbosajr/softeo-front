import fetch from '.';

export default async (id) => fetch.get(`/service-provided/${id}`, {
  headers: {
    authorization: localStorage.getItem('token')
  }
});