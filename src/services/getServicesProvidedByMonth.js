import fetch from '.';

export default async (month) => fetch.get(`/service-provided/all?month=${month}`, {
  headers: {
    authorization: localStorage.getItem('token')
  }
});