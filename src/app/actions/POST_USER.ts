'use server';
import { IUser } from '@/@types/types';
import { SET_TOKEN } from './SET_TOKEN';

type PostUserParams = {
  name: string;
  email: string;
  picture: string;
};

export const POST_USER = async (objUser: PostUserParams) => {
  try {
    const response = await fetch(`http://localhost:3333/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objUser),
    });

    const json = await response.json();
    await SET_TOKEN(json.token);

    return json.data;
  } catch (err) {
    if (err instanceof Error)
      console.log('Não foi possível entrar na conta.', err.message);

    return null;
  }
};
