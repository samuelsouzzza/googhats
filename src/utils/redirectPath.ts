'use server';
import { redirect } from 'next/navigation';

export const redirectPath = (path: string) => {
  redirect(`${path}`);
};
