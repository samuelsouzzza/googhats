import { IMessage } from '@/@types/types';

function formatDate(date: Date) {
  const realDate = new Date(date);
  return realDate?.toLocaleDateString('pt-BR');
}

export const formatDateChat = (messages: IMessage[]) => {
  const groupedMessages = messages?.reduce((acc, message) => {
    const dateString = formatDate(message.sentAt);

    if (!acc[dateString]) acc[dateString] = [];

    acc[dateString].push(message);

    return acc;
  }, {} as Record<string, IMessage[]>);

  return groupedMessages;
};
