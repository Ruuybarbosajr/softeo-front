import fetch from '.';

export default async (id) => fetch.delete(`/client/delete/${id}`, {
  headers: {
    authorization: localStorage.getItem('token')
  }
});