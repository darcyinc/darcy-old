import fetcher from './fetcher';

export default async function doUserLogin(data: {
  email: string;
  password: string;
}) {
  const req = await fetcher.post('/auth/users/login', data);

  return req.data;
}
