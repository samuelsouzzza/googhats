'use client';

import styles from './Chats.module.css';
import { ItemChat } from '../ItemChat/ItemChat';
import { UseGlobalContext } from '@/globals/GlobalContext';
import { IChat } from '@/@types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faSearch } from '@fortawesome/free-solid-svg-icons';
import useSWR from 'swr';
import { Loader } from '../Loader/Loader';
import { MyProfile } from '../MyProfile/MyProfile';

export const Chats = () => {
  const { setOpenedChat, setModalSearchUsers, userLogged } = UseGlobalContext();

  const getChats = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());

  const { data, isLoading, error, isValidating } = useSWR<IChat[] | null>(
    `http://localhost:3333/chats/${userLogged?._id}`,
    getChats,
    {
      refreshInterval: 3000,
      revalidateOnReconnect: true,
      revalidateIfStale: true,
      refreshWhenHidden: true,
    }
  );

  function handleClick(chat: IChat) {
    setOpenedChat(chat);
  }

  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <MyProfile name />
        <div className={styles.boxTools}>
          <FontAwesomeIcon
            className={styles.btnTools}
            icon={faSearch}
            onClick={() => setModalSearchUsers(true)}
          />
          <FontAwesomeIcon className={styles.btnTools} icon={faGear} />
        </div>
      </div>
      <h3>Suas conversas</h3>
      <div>
        <>
          {isLoading && <Loader />}
          {error && <p>Não foi possível buscar as conversas</p>}
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
                onClick={() => handleClick(d)}
                style={{ animationDelay: `${i / 10}s` }}
              />
            ))}
        </>
      </div>
    </section>
  );
};
