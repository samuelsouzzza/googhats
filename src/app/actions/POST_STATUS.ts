'use server';

export const POST_STATUS = async (id: string, status: boolean) => {
  try {
    await fetch(`http://localhost:3333/updateUser/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
  } catch (err) {
    if (err instanceof Error)
      console.log(
        'Não foi possível atualizar o status do perfil.',
        err.message
      );
  }
};
