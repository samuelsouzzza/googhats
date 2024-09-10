'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MenuSearchUsers.module.css';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { Input } from '../Input/Input';
import React from 'react';
import { UseGlobalContext } from '@/globals/GlobalContext';
import { SearchedUsers } from '../SearchedUsers/SearchedUsers';

export const MenuSearchUsers = () => {
  const [searchUserValue, setSearchUserValue] = React.useState('');
  const { menuSearchUsers, setMenuSearchUsers, userLogged } =
    UseGlobalContext();

  return (
    <>
      {menuSearchUsers && (
        <div className={styles.container}>
          <div className={styles.boxTitle}>
            <h3>Buscar usuários</h3>
            <FontAwesomeIcon
              className={styles.closeModal}
              icon={faCircleXmark}
              onClick={() => setMenuSearchUsers(false)}
            />
          </div>
          <form action='#' className={styles.form}>
            <Input
              value={searchUserValue}
              setValue={setSearchUserValue}
              placeholder='Busque por e-mail aqui'
              style={{ fontSize: '0.9rem' }}
            />
          </form>
          <p className={styles.limitChat}>
            Você só pode pesquisar e iniciar conversas com usuários com os quais
            ainda não possui uma conversa ativa. Para continuar uma conversa
            existente, acesse a lista de chats abertos.
          </p>
          <div className={styles.boxListUsers}>
            <SearchedUsers
              fetchPath={
                searchUserValue.length === 0
                  ? `http://localhost:3333/users/${userLogged?._id}`
                  : `http://localhost:3333/users/${
                      userLogged?._id
                    }/${searchUserValue.trim()}`
              }
            />
          </div>
        </div>
      )}
    </>
  );
};
