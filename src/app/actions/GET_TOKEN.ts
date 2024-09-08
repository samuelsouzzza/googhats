'use server';
import { cookies } from 'next/headers';

export const GET_TOKEN = async () => {
  return cookies().get('token_googhats')?.value;
};
