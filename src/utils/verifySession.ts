import { GET_TOKEN } from '@/app/actions/GET_TOKEN';
import { NextResponse } from 'next/server';
import { redirectPath } from './redirectPath';

export const verifySession = async () => {
  if (!(await GET_TOKEN())) redirectPath('/auth');
  NextResponse.next();
};
