'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ModalSearchUsers.module.css';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { Input } from '../Input/Input';
import React from 'react';
import { POST_MESSAGE } from '@/app/actions/POST_MESSAGE';
import { UseGlobalContext } from '@/globals/GlobalContext';
import { SearchedUsers } from '../SearchedUsers/SearchedUsers';

export const ModalSearchUsers = () => {
  const [searchUserValue, setSearchUserValue] = React.useState('');
  const { modalSearchUsers, setModalSearchUsers, userLogged } =
    UseGlobalContext();

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
                placeholder='Busque por e-mail aqui'
                style={{ fontSize: '0.9rem' }}
              />
            </form>
            <div className={styles.boxListUsers}>
              <SearchedUsers
                fetchPath={
                  searchUserValue.length === 0
                    ? `http://localhost:3333/users/${userLogged?._id}`
                    : `http://localhost:3333/users/${userLogged?._id}/${searchUserValue}`
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
