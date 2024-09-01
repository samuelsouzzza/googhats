'use server';
export const POST_CHAT = async (data: { myId: string; yourId: string }) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    await fetch(`http://localhost:3333/newChat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    if (err instanceof Error)
      console.log('Não foi possível criar a conversa.', err.message);
  }
};
