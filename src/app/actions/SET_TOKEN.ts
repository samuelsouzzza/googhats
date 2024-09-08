'use server';
import { cookies } from 'next/headers';

export const SET_TOKEN = async (token: string) => {
  cookies().set('token_googhats', token);
};
