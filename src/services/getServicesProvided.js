import fetch from '.';

// export default async () => axios({
//   baseURL: 'https://softeo-tec-api.herokuapp.com/service-provided/all',
//   headers: {
//     authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVyaWNhIiwiaWQiOiJlMmEzZDhhZS04MWRmLTQ2MDAtYjRkMi01ZDBmYzg4NjdlMGIiLCJpYXQiOjE2NjI1NjYzMzN9.n9K1xsANLNpsr-NPf7TeAU3Hcv7S-sBAy01fD7UFO9A',
//   },
//   method: 'GET',
// });

export default async () => fetch.get('/service-provided/all', {
  headers: {
    authorization: localStorage.getItem('token')
  }
});