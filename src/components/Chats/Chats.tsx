'use client';
import React from 'react';
import styles from './Chats.module.css';
import { ItemChat } from '../ItemChat/ItemChat';
import { UseGlobalContext } from '@/globals/GlobalContext';
import { IChat } from '@/@types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faSearch } from '@fortawesome/free-solid-svg-icons';
import useSWR from 'swr';
import { Loader } from '../Loader/Loader';
import { MyProfile } from '../MyProfile/MyProfile';
import Image from 'next/image';
import { MenuSearchUsers } from '../ModalSearchUsers/MenuSearchUsers';

export const Chats = () => {
  const { setOpenedChat, setMenuSearchUsers, menuSearchUsers, userLogged } =
    UseGlobalContext();

  const getChats = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());

  const { data, isLoading, error } = useSWR<IChat[] | null>(
    userLogged?._id ? `http://localhost:3333/chats/${userLogged._id}` : null,
    getChats,
    {
      refreshInterval: 3000,
    }
  );

  return (
    <>
      <section className={styles.container}>
        <div className={styles.menus}>
          {menuSearchUsers && <MenuSearchUsers />}
          <div className={styles.box}>
            <MyProfile name />
            <div className={styles.boxTools}>
              <FontAwesomeIcon
                className={styles.btnTools}
                icon={faSearch}
                onClick={() => setMenuSearchUsers(true)}
              />
              <FontAwesomeIcon className={styles.btnTools} icon={faGear} />
            </div>
          </div>
          <h3>Suas conversas</h3>
          <div>
            {isLoading && <Loader />}
            {!isLoading && error && (
              <div className={styles.boxErrors}>
                <Image
                  src={'/error.gif'}
                  height={50}
                  width={50}
                  alt='Animação'
                />
                <p>Não foi possível buscar as conversas.</p>
              </div>
            )}
            {data?.length === 0 && (
              <div className={styles.boxErrors}>
                <Image
                  src={'/glasses.gif'}
                  height={50}
                  width={50}
                  alt='Animação'
                />
                <p>Sem conversas ainda. Busque por pessoas para conversar.</p>
              </div>
            )}
            {data
              ?.slice()
              .reverse()
              .sort((a, b) => {
                const dateA = new Date(a.updatedAt);
                const dateB = new Date(b.updatedAt);
                const timeDiff = dateB.getTime() - dateA.getTime();
                return timeDiff;
              })
              .map((d, i) => (
                <ItemChat
                  key={d._id}
                  data={d}
                  onClick={() => setOpenedChat(d)}
                />
              ))}
          </div>
        </div>
      </section>
    </>
  );
};
