import fetch from '.';

export default async (data, id) => fetch.put(`service/update/${id}`, data, {
  headers: {
    authorization: localStorage.getItem('token')
  }
});