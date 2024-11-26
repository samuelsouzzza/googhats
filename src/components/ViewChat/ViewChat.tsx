'use client';
import styles from './ViewChat.module.css';
import Image from 'next/image';
import { Input } from '../Input/Input';
import React from 'react';
import { Button } from '../Button/Button';
import { POST_MESSAGE } from '@/app/actions/POST_MESSAGE';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { UseGlobalContext } from '@/globals/GlobalContext';
import { ToolBar } from '../ToolBar/ToolBar';
import { IChat, IMessage } from '@/@types/types';
import useSWR from 'swr';
import { Loader } from '../Loader/Loader';
import { ProfilePicture } from '../ProfilePicture/ProfilePicture';
import { faCheck, faPhone, faVideo } from '@fortawesome/free-solid-svg-icons';
import { formatDateChat } from '@/utils/formatDateChat';
import { formatUpdatedChat } from '@/utils/formatUpdatedChat';
import { DELETE_CHAT_MESSAGE } from '@/app/actions/DELETE_CHAT_MESSAGE';

type ViewChatProps = {
  open: IChat | null;
};

export const ViewChat = ({ open }: ViewChatProps) => {
  const { setOpenedChat, userLogged, setModalActions } = UseGlobalContext();
  const refBox = React.useRef<HTMLDivElement | null>(null);
  const refBoxLastMessage = React.useRef<HTMLDivElement | null>(null);
  const [newMessage, setNewMessage] = React.useState('');
  const [activeInfoMessage, setActiveInfoMessage] = React.useState<
    string | null
  >(null);

  const otherParticipant = open?.participants.find(
    (p) => p._id !== userLogged?._id
  );
  // console.log('OUTRO PARTICIPANTE', otherParticipant);

  const getUniqueChat = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());

  const { data, isLoading, error } = useSWR<IChat | null>(
    open
      ? `http://localhost:3333/chats/${userLogged?._id}/${otherParticipant?._id}`
      : null,
    getUniqueChat,
    { refreshInterval: 1000, shouldRetryOnError: false }
  );

  // console.log(data);

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

  function cleanChat(idChat: string, idMessage?: string) {
    setModalActions(null);

    if (idMessage) DELETE_CHAT_MESSAGE(idChat, idMessage);
    else {
      setOpenedChat(null);
      DELETE_CHAT_MESSAGE(idChat);
    }
  }

  function handleClickCleanChat() {
    console.log('AQIOOOOOOOO', open?._id);
    setModalActions({
      icon: faTrashAlt,
      message: 'Deseja excluir toda esta conversa?',
      type: 'yes-no',
      onOk: () => cleanChat(data?._id as string),
    });
  }

  function handleClickCleanMessage(idMessage: string) {
    setModalActions({
      icon: faTrashAlt,
      message: 'Deseja apagar esta mensagem?',
      type: 'yes-no',
      onOk: () => cleanChat(data?._id as string, idMessage),
    });
  }

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
            priority
            width={150}
            height={150}
            alt='Ilustração boas vindas'
          />
          <p>Inicie ou entre em alguma conversa</p>
        </div>
      ) : (
        <>
          <div className={styles.boxView}>
            <div className={styles.titleChat}>
              <div className={styles.contactInfo}>
                <ProfilePicture
                  path={otherParticipant?.profilePic as string}
                  size={50}
                  online={otherParticipant?.online}
                />
                <div>
                  <h3>{otherParticipant?.name}</h3>
                  <p className={styles.statusOnline}>
                    {otherParticipant?.online
                      ? 'online'
                      : `${formatUpdatedChat(
                          otherParticipant?.lastAcess as Date
                        )}`}
                  </p>
                </div>
              </div>
              <div className={styles.boxControls}>
                <FontAwesomeIcon
                  icon={faPhone}
                  className={styles.itemControls}
                />
                <FontAwesomeIcon
                  icon={faVideo}
                  className={styles.itemControls}
                />
                {data?.messages?.length ? (
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className={styles.itemControls}
                    onClick={handleClickCleanChat}
                  />
                ) : (
                  ''
                )}

                <FontAwesomeIcon
                  icon={faXmarkCircle}
                  className={styles.itemControls}
                  onClick={() => setOpenedChat(null)}
                />
              </div>
            </div>
            <div className={styles.containerMessages}>
              {error && <p>Não foi possível buscar a conversa</p>}
              {isLoading && <Loader />}
              <div className={styles.boxMessageWarning}>
                <div className={styles.messageWarning}>
                  <p>Atenção!</p>
                  <p>
                    Nosso aplicativo de chat é voltado para fins educativos e de
                    aprendizado. Recomendamos que não compartilhe informações
                    confidenciais ou pessoais como senhas, dados bancários ou
                    qualquer outro tipo de dado sensível. Sua privacidade é
                    importante para nós, e estamos comprometidos em manter um
                    ambiente seguro para o desenvolvimento e troca de
                    conhecimento. Obrigado pela compreensão!
                  </p>
                </div>
              </div>
              <div>
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
                      <p>{`Diga "Olá, ${otherParticipant?.name}!"`}</p>
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
                            style={{ animationDelay: `${i / 10}s` }}
                            ref={
                              i === arr.length - 1 ? refBoxLastMessage : null
                            }
                            key={m._id}
                            className={`${styles.boxMessage}
                            
            ${
              m.senderId === userLogged?._id
                ? styles.myBoxMessages
                : styles.yourBoxMessages
            } fadeIn`}
                            onMouseEnter={() => setActiveInfoMessage(m._id)}
                            onMouseLeave={() => setActiveInfoMessage(null)}
                          >
                            {activeInfoMessage === m._id &&
                              userLogged?._id === m.senderId && (
                                <div
                                  className={`${styles.boxDeleteMessage} fadeIn`}
                                  style={{
                                    justifyContent:
                                      m.senderId === userLogged?._id
                                        ? 'flex-end'
                                        : 'flex-start',
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faTrashAlt}
                                    className={styles.iconDeleteMessageItem}
                                    onClick={() =>
                                      handleClickCleanMessage(m._id)
                                    }
                                  />
                                </div>
                              )}

                            <span
                              key={i}
                              className={`${styles.message} ${
                                m.senderId === userLogged?._id
                                  ? styles.myMessages
                                  : styles.yourMessages
                              }`}
                            >
                              {m.text}
                              <span
                                className={styles.boxTimeStampAndRead}
                                style={{
                                  justifyContent:
                                    m.senderId === userLogged?._id
                                      ? 'flex-end'
                                      : 'flex-start',
                                }}
                              >
                                <p>
                                  {new Date(m.sentAt)
                                    .toLocaleTimeString('pt-BR')
                                    .slice(0, 5)}
                                </p>

                                {userLogged!._id === m.senderId && (
                                  <FontAwesomeIcon icon={faCheck} />
                                )}
                              </span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
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
              <Button disabled={!newMessage} />
            </form>
          </div>
        </>
      )}
    </section>
  );
};
