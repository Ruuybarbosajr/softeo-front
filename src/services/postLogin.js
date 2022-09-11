import fetch from '.';

export default async (data) => fetch.post('/login', data);