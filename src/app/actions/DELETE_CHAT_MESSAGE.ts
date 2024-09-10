export const DELETE_CHAT_MESSAGE = async (
  idChat: string,
  idMessage?: string
) => {
  try {
    const url = idMessage
      ? `http://localhost:3333/deleteChatMessage/${idChat}/${idMessage}`
      : `http://localhost:3333/deleteChatMessage/${idChat}`;

    await fetch(url, {
      method: 'DELETE',
    });

    return;
  } catch (err) {
    if (err instanceof Error)
      console.log('Não foi possível apagar a conversa/mensagem.', err.message);
  }
};
