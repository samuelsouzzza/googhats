'use client';
import styles from './ViewChat.module.css';
import Image from 'next/image';
import { Input } from '../Input/Input';
import React from 'react';
import { Button } from '../Button/Button';
import { POST_MESSAGE } from '@/app/actions/POST_MESSAGE';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { UseGlobalContext } from '@/globals/GlobalContext';
import { ToolBar } from '../ToolBar/ToolBar';
import { IChat } from '@/@types/types';
import useSWR from 'swr';
import { MagicMotion } from 'react-magic-motion';
import { Loader } from '../Loader/Loader';
import { width } from '@fortawesome/free-regular-svg-icons/faAddressBook';

type ViewChatProps = {
  open: IChat | null;
};

export const ViewChat = ({ open }: ViewChatProps) => {
  const { setOpenedChat, openedChat, userLogged } = UseGlobalContext();
  const refBox = React.useRef<HTMLDivElement | null>(null);
  const refBoxLastMessage = React.useRef<HTMLDivElement | null>(null);
  const [newMessage, setNewMessage] = React.useState('');

  const getUniqueChat = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());

  const { data, isLoading, error } = useSWR<IChat | null>(
    `http://localhost:3333/chats/${userLogged?._id}/${open?.participants[1]._id}`,
    getUniqueChat,
    { refreshInterval: 1000 }
  );

  React.useEffect(() => {
    refBoxLastMessage.current?.scrollIntoView();
  }, [open, data, data?.messages]);

  React.useEffect(() => {
    function handleListener(e: KeyboardEvent) {
      if (e.key === 'Enter') POST_MESSAGE;
    }

    window.addEventListener('keydown', handleListener);

    return () => window.removeEventListener('keydown', handleListener);
  }, []);

  return (
    <section
      ref={refBox}
      className={styles.container}
      style={{ backgroundImage: open ? `url('/doodle2.svg')` : '' }}
    >
      {!open ? (
        <div className={styles.getStarted}>
          <Image
            src={'/conversando.png'}
            width={100}
            height={100}
            alt='Ilustração de uma casa'
          />
          <p>Inicie ou entre em alguma conversa</p>
        </div>
      ) : (
        <>
          <div className={styles.titleChat}>
            <div className={styles.contactInfo}>
              <Image
                src={
                  data?.participants[1].profilePic
                    ? (data?.participants[1].profilePic as string)
                    : '/user.png'
                }
                height={50}
                width={50}
                alt='Foto de perfil do contato com conversa aberta'
                className={styles.imgProfile}
              />
              <h3>{data?.participants[1].name}</h3>
            </div>
            <FontAwesomeIcon
              icon={faCircleXmark}
              className={styles.closeChat}
              onClick={() => setOpenedChat(null)}
            />
          </div>
          <div className={styles.containerMessages}>
            {error && <p>Não foi possível buscar a conversa</p>}
            {isLoading && <Loader />}
            <MagicMotion>
              <>
                {data?.messages?.length === 0 && (
                  <div className={styles.wrapperWelcome}>
                    <div
                      className={`${styles.boxWelcome} fadeIn`}
                      onClick={() => {
                        POST_MESSAGE(
                          userLogged!._id,
                          data?.participants[1]._id as string,
                          `Olá, ${data.participants[1].name}!`
                        );
                      }}
                    >
                      <p>{`Diga "Olá, ${data?.participants[1].name}!"`}</p>
                      <Image
                        src={'/hello.gif'}
                        width={50}
                        height={50}
                        alt='Ícone de saudação'
                      />
                    </div>
                  </div>
                )}
                {data?.messages?.map((m, i, arr) => (
                  <div
                    ref={i === arr.length - 1 ? refBoxLastMessage : null}
                    key={`${open?._id} + ${i} `}
                    className={`${styles.boxMessage}
            ${
              m.senderId === userLogged?._id
                ? styles.myBoxMessages
                : styles.yourBoxMessages
            }`}
                  >
                    <p
                      key={i}
                      className={
                        `${styles.message} ${
                          m.senderId === userLogged?._id
                            ? styles.myMessages
                            : styles.yourMessages
                        }` + ' fadeIn'
                      }
                      style={{
                        animationDelay: `${i / 50}s`,
                      }}
                    >
                      {m.text}
                      <span
                        className={styles.timeStamp}
                        style={{
                          alignSelf:
                            m.senderId === userLogged?._id
                              ? 'flex-end'
                              : 'flex-start',
                        }}
                      >
                        {m.sentAt.toString()}
                      </span>
                    </p>
                  </div>
                ))}
              </>
            </MagicMotion>
          </div>
          <form
            action={() => {
              POST_MESSAGE(
                userLogged!._id,
                data?.participants[1]._id as string,
                newMessage
              );
              setNewMessage('');
            }}
            className={styles.form}
          >
            <ToolBar />
            <Input value={newMessage} setValue={setNewMessage} />
            <Button />
          </form>
        </>
      )}
    </section>
  );
};
