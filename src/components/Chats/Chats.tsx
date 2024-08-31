'use client';

import styles from './Chats.module.css';
import { ItemChat } from '../ItemChat/ItemChat';
import { UseGlobalContext } from '@/globals/GlobalContext';
import { IContact } from '@/@types/types';

export const Chats = () => {
  const { setOpenedChat } = UseGlobalContext();

  const contacts = [
    {
      contactName: 'Diego',
      messages: [
        {
          user: 'Diego',
          userProfile: '/diego.png',
          timeStamp: '28/06/2003 13h05min',
          message: 'Ei, Samuel, você já pensou em trabalhar em uma startup?',
        },
        {
          user: 'Samuel',
          userProfile: '/samuel.png',
          timeStamp: '28/06/2003 13h06min',
          message:
            'Sim, já pensei nisso algumas vezes. Parece uma ótima oportunidade para aprender e crescer rápido!',
        },
        {
          user: 'Diego',
          userProfile: '/diego.png',
          timeStamp: '28/06/2003 13h07min',
          message:
            'Exatamente! Você tem algum interesse específico em alguma área?',
        },
        {
          user: 'Samuel',
          userProfile: '/samuel.png',
          timeStamp: '28/06/2003 13h08min',
          message:
            'Estou muito interessado em desenvolvimento web e aplicações escaláveis. Também gosto de aprender sobre DevOps.',
        },
        {
          user: 'Diego',
          userProfile: '/diego.png',
          timeStamp: '28/06/2003 13h09min',
          message:
            'Isso é ótimo! Acho que você se sairia muito bem em uma startup.',
        },
        {
          user: 'Samuel',
          userProfile: '/samuel.png',
          timeStamp: '28/06/2003 13h10min',
          message:
            'Obrigado, Diego! E você? Tem interesse em trabalhar em algum setor específico?',
        },
        {
          user: 'Diego',
          userProfile: '/diego.png',
          timeStamp: '28/06/2003 13h11min',
          message:
            'Estou pensando em entrar na área de UX/UI Design. Acho fascinante como o design pode influenciar a experiência do usuário.',
        },
        {
          user: 'Samuel',
          userProfile: '/samuel.png',
          timeStamp: '28/06/2003 13h12min',
          message:
            'Isso é incrível! UX/UI é uma parte essencial de qualquer aplicativo. Tenho certeza de que você se sairia muito bem!',
        },
        {
          user: 'Diego',
          userProfile: '/diego.png',
          timeStamp: '28/06/2003 13h13min',
          message:
            'Obrigado, Samuel! Quem sabe, um dia, possamos colaborar em um projeto juntos.',
        },
        {
          user: 'Samuel',
          userProfile: '/samuel.png',
          timeStamp: '28/06/2003 13h14min',
          message:
            'Eu adoraria isso! Seria uma ótima experiência trabalhar com você.',
        },
      ].reverse(),
    },
    {
      contactName: 'Camila',
      messages: [
        {
          user: 'Camila',
          userProfile: '/camila.png',
          timeStamp: '28/06/2003 12h55min',
          message: 'Oi, Samuel! Como você está hoje?',
        },
        {
          user: 'Samuel',
          userProfile: '/samuel.png',
          timeStamp: '28/06/2003 12h56min',
          message: 'Oi, Camila! Estou bem, obrigado! E você?',
        },
        {
          user: 'Camila',
          userProfile: '/camila.png',
          timeStamp: '28/06/2003 12h57min',
          message: 'Estou ótima! O que você tem feito ultimamente?',
        },
        {
          user: 'Samuel',
          userProfile: '/samuel.png',
          timeStamp: '28/06/2003 12h58min',
          message:
            'Ah, tenho estudado bastante programação. Estou aprendendo sobre desenvolvimento full stack com Next.js e Node.js.',
        },
        {
          user: 'Camila',
          userProfile: '/camila.png',
          timeStamp: '28/06/2003 12h59min',
          message: 'Uau, isso é incrível! Deve ser muito interessante!',
        },
        {
          user: 'Samuel',
          userProfile: '/samuel.png',
          timeStamp: '28/06/2003 13h00min',
          message:
            'Sim, é muito desafiador, mas também muito gratificante. Eu realmente gosto de resolver problemas e construir coisas novas.',
        },
        {
          user: 'Camila',
          userProfile: '/camila.png',
          timeStamp: '28/06/2003 13h01min',
          message: 'Que legal! Você já conseguiu criar algum projeto?',
        },
        {
          user: 'Samuel',
          userProfile: '/samuel.png',
          timeStamp: '28/06/2003 13h02min',
          message:
            'Sim, fiz alguns projetos pequenos para praticar, como um aplicativo de lista de tarefas e um blog simples. Estou trabalhando em algo maior agora!',
        },
        {
          user: 'Camila',
          userProfile: '/camila.png',
          timeStamp: '28/06/2003 13h03min',
          message: 'Nossa, que demais! Quero ver quando estiver pronto!',
        },
        {
          user: 'Samuel',
          userProfile: '/samuel.png',
          timeStamp: '28/06/2003 13h04min',
          message: 'Com certeza, eu te mostro assim que terminar!',
        },
      ].reverse(),
    },
  ];

  function handleClick(open: IContact) {
    setOpenedChat(open);
  }

  return (
    <section className={styles.container}>
      <h3>Suas conversas</h3>
      <div>
        {contacts.map((c, i) => {
          return (
            <ItemChat
              key={i}
              nameContact={c.contactName}
              lastMessage={c.messages[0]?.message}
              onClick={() => handleClick(c)}
            />
          );
        })}
      </div>
    </section>
  );
};
