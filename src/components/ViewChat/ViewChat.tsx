'use client';
import styles from './ViewChat.module.css';
import Image from 'next/image';
import { Input } from '../Input/Input';
import React from 'react';
import { Button } from '../Button/Button';
import { POST_MESSAGE } from '@/app/actions/POST_MESSAGE';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleXmark,
  faXmarkCircle,
} from '@fortawesome/free-regular-svg-icons';
import { UseGlobalContext } from '@/globals/GlobalContext';
import { ToolBar } from '../ToolBar/ToolBar';
import { IChat, IMessage } from '@/@types/types';
import useSWR from 'swr';
import { Loader } from '../Loader/Loader';
import { ProfilePicture } from '../ProfilePicture/ProfilePicture';
import {
  faEllipsis,
  faEraser,
  faPhone,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { formatDateChat } from '@/utils/formatDateChat';
import { MagicMotion } from 'react-magic-motion';

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

  const messagesPerDate = formatDateChat(data?.messages as IMessage[]);
  const now = new Date();
  const todayDate = now.toLocaleDateString('pt-BR');
  const yesterday = new Date(now.setDate(now.getDay()));
  const yesterdayDate = yesterday.toLocaleDateString('pt-BR');

  const sortedDates =
    messagesPerDate &&
    Object.keys(messagesPerDate).sort((a, b) => {
      const dateA = new Date(a.split('/').reverse().join('-'));
      const dateB = new Date(b.split('/').reverse().join('-'));
      return dateA.getTime() - dateB.getTime();
    });

  return (
    <section
      ref={refBox}
      className={styles.container}
      style={{ backgroundImage: open ? `url('/doodle2.svg')` : '' }}
    >
      {!open ? (
        <div className={styles.getStarted}>
          <Image
            src={'/welcome.gif'}
            unoptimized
            width={150}
            height={150}
            alt='Ilustração de uma casa'
          />
          <p>Inicie ou entre em alguma conversa</p>
        </div>
      ) : (
        <>
          <div className={styles.titleChat}>
            <div className={styles.contactInfo}>
              <ProfilePicture
                path={
                  data?.participants[1].profilePic
                    ? (data?.participants[1].profilePic as string)
                    : '/user.png'
                }
                size={50}
                online={data?.participants[1].online}
              />
              <div>
                <h3>{data?.participants[1].name}</h3>
                <p className={styles.statusOnline}>
                  {data?.participants[1].online ? 'online' : ''}
                </p>
              </div>
            </div>
            <div className={styles.boxControls}>
              <FontAwesomeIcon icon={faPhone} className={styles.itemControls} />
              <FontAwesomeIcon icon={faVideo} className={styles.itemControls} />
              <FontAwesomeIcon
                icon={faEraser}
                className={styles.itemControls}
              />
              <FontAwesomeIcon
                icon={faXmarkCircle}
                className={styles.itemControls}
                onClick={() => setOpenedChat(null)}
              />
            </div>
          </div>
          <MagicMotion>
            <div className={styles.containerMessages}>
              {error && <p>Não foi possível buscar a conversa</p>}
              {isLoading && <Loader />}
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
                      <Image
                        src={'/message.gif'}
                        width={100}
                        height={100}
                        alt='Ícone de saudação'
                        unoptimized
                      />
                      <p>{`Diga "Olá, ${data?.participants[1].name}!"`}</p>
                    </div>
                  </div>
                )}

                {sortedDates?.map((date, i) => {
                  return (
                    <div key={`${date}${i}`}>
                      <div className={styles.dateGrouped}>
                        <p>
                          {date === todayDate
                            ? 'Hoje'
                            : date === yesterdayDate
                            ? 'Ontem'
                            : date}
                        </p>
                      </div>
                      <div className={styles.boxMessagesGrouped}>
                        {messagesPerDate[date]?.map((m, i, arr) => (
                          <div
                            ref={
                              i === arr.length - 1 ? refBoxLastMessage : null
                            }
                            key={`${i} `}
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
                                {new Date(m.sentAt)
                                  .toLocaleTimeString('pt-BR')
                                  .slice(0, 5)}
                              </span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </>
            </div>
          </MagicMotion>
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
            <Button disabled={!newMessage} />
          </form>
        </>
      )}
    </section>
  );
};
