'use client';
import { IUser } from '@/@types/types';
import styles from './SearchedUsers.module.css';
import Image from 'next/image';
import { Button } from '../Button/Button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import useSWR from 'swr';
import { Loader } from '../Loader/Loader';

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

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && error && (
        <p className={styles.error}>Não foi possível buscar os usuários.</p>
      )}
      {data && data?.length < 1 && (
        <p className={styles.error}>Nenhum usuário encontrado.</p>
      )}
      {data?.map((d, i) => {
        return (
          <div
            className={`${styles.itemUser} fadeIn`}
            style={{ animationDelay: `${i / 5}s` }}
            key={d._id}
          >
            <div className={styles.infoUser}>
              <Image
                className={styles.imgProfile}
                src={`${d.profilePic}`}
                height={40}
                width={40}
                alt='Fotos de perfil dos usuários'
                placeholder='blur'
                blurDataURL={d.profilePic}
              />
              <div>
                <p>{d.name}</p>
                <span className={styles.infoEmail}>{d.email}</span>
              </div>
            </div>
            <Button
              icon={faPlus}
              //   onClick={openNewChat}
            />
          </div>
        );
      })}
    </>
  );
};