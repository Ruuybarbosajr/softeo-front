import fetch from '.';

export default async (id) => fetch.delete(`/service/delete/${id}`, {
  headers: {
    authorization: localStorage.getItem('token')
  }
});