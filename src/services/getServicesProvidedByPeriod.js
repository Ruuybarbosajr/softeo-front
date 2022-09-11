import fetch from '.';

export default async (initial, final) => fetch.get(`/service-provided/all?gte=${initial}&lte=${final}`, {
  headers: {
    authorization: localStorage.getItem('token')
  }
});