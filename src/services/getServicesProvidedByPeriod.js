import axios from 'axios';

export default async (initial, final) => axios({
  baseURL: `http://localhost:3001/service-provided/all?gte=${initial}&lte=${final}`,
  headers: {
    authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVyaWNhIiwiaWQiOiJlMmEzZDhhZS04MWRmLTQ2MDAtYjRkMi01ZDBmYzg4NjdlMGIiLCJpYXQiOjE2NjI1NjYzMzN9.n9K1xsANLNpsr-NPf7TeAU3Hcv7S-sBAy01fD7UFO9A',
  },
  method: 'GET',
});