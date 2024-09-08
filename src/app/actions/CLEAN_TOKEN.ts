'use server';
import { cookies } from 'next/headers';

export const CLEAN_TOKEN = async () => {
  cookies().delete('token_googhats');
  return '';
};
