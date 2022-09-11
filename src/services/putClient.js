import fetch from '.';

export default async (data, id) => fetch.put(`/client/update/${id}`, data, {
  headers: {
    authorization: localStorage.getItem('token')
  }
});