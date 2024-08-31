'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ModalSearchUsers.module.css';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { Input } from '../Input/Input';
import React from 'react';
import { Button } from '../Button/Button';
import { POST_MESSAGE } from '@/app/actions/POST_MESSAGE';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { UseGlobalContext } from '@/globals/GlobalContext';

export const ModalSearchUsers = () => {
  const [searchUserValue, setSearchUserValue] = React.useState('');
  const { modalSearchUsers, setModalSearchUsers, setOpenedChat } =
    UseGlobalContext();

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
  function openNewChat() {
    setOpenedChat(contacts[0]);
  }

  return (
    <>
      {modalSearchUsers && (
        <div className={styles.wrapper}>
          <div className={styles.container + ' fadeIn'}>
            <div className={styles.boxTitle}>
              <h3>Buscar usuários</h3>
              <FontAwesomeIcon
                className={styles.closeModal}
                icon={faCircleXmark}
                onClick={() => setModalSearchUsers(false)}
              />
            </div>
            <form action={POST_MESSAGE} className={styles.form}>
              <Input
                value={searchUserValue}
                setValue={setSearchUserValue}
                placeholder='Busque por e-mail ou nome de usuário'
                style={{ fontSize: '1rem' }}
              />
              <Button icon={faSearch} />
            </form>

            <div className={styles.boxListUsers}>
              <div className={styles.itemUser}>
                <div className={styles.infoUser}>
                  <Image
                    src={'/user.png'}
                    height={40}
                    width={40}
                    alt='Fotos de perfil dos usuários'
                  />
                  <div>
                    <p>Gustavo</p>
                    <span className={styles.infoEmail}>
                      gustavo116@gmail.com
                    </span>
                  </div>
                </div>
                <Button icon={faPlus} onClick={openNewChat} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
