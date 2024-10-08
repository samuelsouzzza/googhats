'use client';
import styles from './page.module.css';
import { TopBar } from '@/components/TopBar/TopBar';
import { Chats } from '@/components/Chats/Chats';
import { ViewChat } from '@/components/ViewChat/ViewChat';
import { UseGlobalContext } from '@/globals/GlobalContext';
import React from 'react';
import { redirectPath } from '@/utils/redirectPath';
import { ModalActions } from '@/components/ModalActions/ModalActions';

export default function Home() {
  const { openedChat, userLogged, modalActions } = UseGlobalContext();

  React.useEffect(() => {
    if (!userLogged) redirectPath('/auth');
  }, [userLogged]);

  return (
    <div className={styles.wrapper}>
      <TopBar />
      <Chats />
      <ViewChat open={openedChat} />
      {modalActions && <ModalActions />}
    </div>
  );
}
