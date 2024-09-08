'use client';
import { IUser } from '@/@types/types';
import styles from './SearchedUsers.module.css';
import Image from 'next/image';
import { Button } from '../Button/Button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import useSWR from 'swr';
import { Loader } from '../Loader/Loader';
import { POST_CHAT } from '@/app/actions/POST_CHAT';
import { UseGlobalContext } from '@/globals/GlobalContext';
import React from 'react';
import { ProfilePicture } from '../ProfilePicture/ProfilePicture';

type SearchedUsersProps = {
  fetchPath: string;
};

export const SearchedUsers = ({ fetchPath }: SearchedUsersProps) => {
  const getUsers = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());

  const { data, isLoading, error } = useSWR<IUser[] | null>(
    `${fetchPath}`,
    getUsers
  );

  const { userLogged, setMenuSearchUsers } = UseGlobalContext();

  async function handleNewChat(userId: string) {
    const data: { myId: string; yourId: string } = {
      myId: userLogged?._id as string,
      yourId: userId,
    };

    await POST_CHAT(data);
    setMenuSearchUsers(false);
  }

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && error && (
        <div className={styles.boxErrors}>
          <Image
            src={'/error.gif'}
            width={50}
            height={50}
            alt='Animação'
            className='fadeIn'
          />
          <p>Não foi possível buscar os usuários.</p>
        </div>
      )}
      {data && data?.length < 1 && (
        <div className={styles.boxErrors}>
          <Image
            src={'/not-found.gif'}
            width={100}
            height={100}
            alt='Animação'
            className='fadeIn'
          />
          <p>Nenhum usuário encontrado.</p>
        </div>
      )}
      {data
        ?.sort((a, b) => (a.name > b.name ? 1 : -1))
        ?.map((d, i) => {
          return (
            <div
              key={d._id}
              className={`${styles.container} fadeIn`}
              style={{ animationDelay: `${i / 5}s` }}
            >
              <div className={styles.itemUser}>
                <div className={styles.infoUser}>
                  <ProfilePicture
                    path={`${d.profilePic}`}
                    online={d.online}
                    size={40}
                  />
                  <div>
                    <p>{d.name}</p>
                    <span className={styles.infoEmail}>{d.email}</span>
                  </div>
                </div>
              </div>
              <form action={() => handleNewChat(d._id)} className={styles.form}>
                <Button
                  icon={faPlus}
                  style={{
                    padding: '2%',
                    width: '100%',
                  }}
                />
              </form>
            </div>
          );
        })}
    </>
  );
};
