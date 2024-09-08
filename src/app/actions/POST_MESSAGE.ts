'use server';

export const POST_MESSAGE = async (
  myId: string,
  yourId: string,
  text: string
) => {
  try {
    await fetch(`http://localhost:3333/newMessage/${myId}/${yourId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    console.log('Mensagem enviada!');
  } catch (err) {
    if (err instanceof Error)
      console.log('Não foi possível enviar a mensagem.', err.message);
  }

  return '';
};
