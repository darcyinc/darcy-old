import { axios } from './axios';
import type { AccountData } from '@/context/accountStore';

export default async function getUserFromToken(): Promise<AccountData> {
  const req = await axios.get('/users/@me');

  if (req.data.errors) {
    throw new Error(req.data.errors[0].message);
  }

  return req.data;
}
