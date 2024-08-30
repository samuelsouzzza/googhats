'use client';
import styles from './ViewChat.module.css';
import Image from 'next/image';
import { InputMessage } from '../InputMessage/InputMessage';
import React from 'react';
import { Button } from '../Button/Button';
import { POST_MESSAGE } from '@/app/actions/POST_MESSAGE';
import { IContact } from '@/@types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { UseGlobalContext } from '@/globals/GlobalContext';

const userLogged = 'Samuel';

type ViewChatProps = {
  contact: IContact | null;
};

export const ViewChat = ({ contact }: ViewChatProps) => {
  const { setOpenedChat } = UseGlobalContext();
  const refBox = React.useRef<HTMLDivElement | null>(null);
  const refBoxLastMessage = React.useRef<HTMLDivElement | null>(null);
  const [newMessage, setNewMessage] = React.useState('');

  React.useEffect(() => {
    const endSection = refBox.current as HTMLDivElement;
    endSection.scrollTo({
      top: endSection.scrollHeight,
      behavior: 'smooth',
    });
  }, []);

  React.useEffect(() => {
    function handleListener(e: KeyboardEvent) {
      if (e.key === 'enter') POST_MESSAGE;
    }

    window.addEventListener('keydown', handleListener);

    return () => window.removeEventListener('keydown', handleListener);
  }, []);

  return (
    <section
      ref={refBox}
      className={styles.container}
      style={{ backgroundImage: contact ? `url('/doodle2.svg')` : '' }}
    >
      {!contact ? (
        <div className={styles.getStarted}>
          <Image
            src={'/home.png'}
            width={100}
            height={100}
            alt='Ilustração de uma casa'
          />
          <p>Inicie ou entre em uma conversa</p>
        </div>
      ) : (
        <>
          <div className={styles.titleChat}>
            <div className={styles.contactInfo}>
              <Image
                src={'/user.png'}
                height={50}
                width={50}
                alt='Foto de perfil do contato com conversa aberta'
              />
              <h3>{contact?.contactName}</h3>
            </div>
            <FontAwesomeIcon
              icon={faCircleXmark}
              className={styles.closeChat}
              onClick={() => setOpenedChat(null)}
            />
          </div>
          <div className={styles.containerMessages}>
            {contact?.messages?.map((m, i) => (
              <div
                ref={refBoxLastMessage}
                key={i}
                className={`${styles.boxMessage}
            ${
              m.user === userLogged
                ? styles.myBoxMessages
                : styles.yourBoxMessages
            }`}
              >
                <p
                  key={i}
                  className={`${styles.message} ${
                    m.user === userLogged
                      ? styles.myMessages
                      : styles.yourMessages
                  }`}
                  style={{ animationDelay: `${i / 5}s` }}
                >
                  {m.message}
                  <span
                    className={styles.timeStamp}
                    style={{
                      alignSelf:
                        m.user === userLogged ? 'flex-end' : 'flex-start',
                    }}
                  >
                    {m.timeStamp}
                  </span>
                </p>
              </div>
            ))}
          </div>
          <form action={POST_MESSAGE} className={styles.form}>
            <InputMessage value={newMessage} setValue={setNewMessage} />
            <Button type='submit' text='Enviar' />
          </form>
        </>
      )}
    </section>
  );
};
