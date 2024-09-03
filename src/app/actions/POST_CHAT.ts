'use server';

import { mutate } from 'swr';

export const POST_CHAT = async (data: { myId: string; yourId: string }) => {
  try {
    await fetch(`http://localhost:3333/newChat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // await mutate(`http://localhost:3333/chats/${data.myId}`);
  } catch (err) {
    if (err instanceof Error)
      console.log('Não foi possível criar a conversa.', err.message);
  }
};
