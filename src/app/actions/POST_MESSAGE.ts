'use server';

export const POST_MESSAGE = async (
  myId: string,
  yourId: string,
  text: string
) => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    await fetch(`http://localhost:3333/newMessage/${myId}/${yourId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
  } catch (err) {
    if (err instanceof Error)
      console.log('Não foi possível criar a conversa.', err.message);
  }

  return '';
};
