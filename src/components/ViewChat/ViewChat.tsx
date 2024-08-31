'use client';
import styles from './ViewChat.module.css';
import Image from 'next/image';
import { Input } from '../Input/Input';
import React from 'react';
import { Button } from '../Button/Button';
import { POST_MESSAGE } from '@/app/actions/POST_MESSAGE';
import { IContact } from '@/@types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { UseGlobalContext } from '@/globals/GlobalContext';
import { ToolBar } from '../ToolBar/ToolBar';

const userLogged = 'Samuel';

type ViewChatProps = {
  open: IContact | null;
};

export const ViewChat = ({ open }: ViewChatProps) => {
  const { setOpenedChat } = UseGlobalContext();
  const refBox = React.useRef<HTMLDivElement | null>(null);
  const refBoxLastMessage = React.useRef<HTMLDivElement | null>(null);
  const [newMessage, setNewMessage] = React.useState('');

  React.useEffect(() => {
    refBoxLastMessage.current?.scrollIntoView();
  }, [open, open?.messages]);

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
                src={'/user.png'}
                height={50}
                width={50}
                alt='Foto de perfil do contato com conversa aberta'
              />
              <h3>{open?.contactName}</h3>
            </div>
            <FontAwesomeIcon
              icon={faCircleXmark}
              className={styles.closeChat}
              onClick={() => setOpenedChat(null)}
            />
          </div>
          <div className={styles.containerMessages}>
            {open?.messages
              ?.slice()
              .reverse()
              .map((m, i, arr) => (
                <div
                  ref={i === arr.length - 1 ? refBoxLastMessage : null}
                  key={`${open?.contactName}-${i}`}
                  className={`${styles.boxMessage}
            ${
              m.user === userLogged
                ? styles.myBoxMessages
                : styles.yourBoxMessages
            }`}
                >
                  <p
                    key={i}
                    className={
                      `${styles.message} ${
                        m.user === userLogged
                          ? styles.myMessages
                          : styles.yourMessages
                      }` + ' fadeIn'
                    }
                    style={{ animationDelay: `${i / 20}s` }}
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
            <ToolBar />
            <Input value={newMessage} setValue={setNewMessage} />
            <Button />
          </form>
        </>
      )}
    </section>
  );
};
