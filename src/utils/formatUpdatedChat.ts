export const formatUpdatedChat = (date?: Date) => {
  if (date) {
    const realDate = new Date(date);
    const now = new Date();
    const nowToYesterday = new Date();

    const brazilianDate = realDate.toLocaleDateString('pt-BR');

    const yesterday = new Date(nowToYesterday.setDate(nowToYesterday.getDay()));
    const yesterdayDate = yesterday.toLocaleDateString('pt-BR');

    if (brazilianDate === now.toLocaleDateString('pt-BR')) {
      const brazilianShortTime = realDate
        .toLocaleTimeString('pt-BR')
        .slice(0, 5);
      return brazilianShortTime;
    }

    if (brazilianDate === yesterdayDate) return 'Ontem';

    return `${brazilianDate}`;
  }

  return false;
};
