import { NextRequest, NextResponse } from 'next/server';
import { GET_TOKEN } from './app/actions/GET_TOKEN';

export const middleware = async (req: NextRequest) => {
  if (!(await GET_TOKEN()))
    return NextResponse.redirect(new URL('/auth', req.url));

  NextResponse.next();
};

export const config = { matcher: ['/'] };
