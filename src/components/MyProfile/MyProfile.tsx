'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import styles from './MyProfile.module.css';
import React from 'react';
import { UseGlobalContext } from '@/globals/GlobalContext';
import { CLEAN_TOKEN } from '@/app/actions/CLEAN_TOKEN';
import { verifySession } from '@/utils/verifySession';
import { POST_STATUS } from '@/app/actions/POST_STATUS';

export const MyProfile = ({ name }: { name?: boolean }) => {
  const refProfile = React.useRef<HTMLImageElement | null>(null);
  const refSpan = React.useRef<HTMLSpanElement | null>(null);
  const [activeProfileOptions, setActiveProfileOptions] = React.useState(false);
  const { userLogged } = UseGlobalContext();

  const profilePic = userLogged?.profilePic
    ? userLogged?.profilePic
    : '/user.png';

  React.useEffect(() => {
    function handleMouseHover() {
      setActiveProfileOptions((prev) => !prev);
    }

    if (refProfile.current)
      refProfile.current?.addEventListener('mouseenter', handleMouseHover);

    if (refSpan.current)
      refSpan.current.addEventListener('mouseleave', handleMouseHover);

    return () => {
      refProfile.current?.removeEventListener('mouseenter', handleMouseHover);
      refSpan.current?.removeEventListener('mouseleave', handleMouseHover);
    };
  }, []);

  async function logOut() {
    await POST_STATUS(userLogged?._id as string, false);
    CLEAN_TOKEN();
    verifySession();
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Image
          src={`${profilePic}`}
          height={30}
          width={30}
          alt='Foto de perfil do usuário logado'
          ref={refProfile}
          className={styles.img}
        />
        <span
          ref={refSpan}
          className={`${styles.containerMenu} ${
            activeProfileOptions ? styles.active : ''
          }`}
          onClick={logOut}
        >
          <FontAwesomeIcon icon={faCircleXmark} />
        </span>
      </div>
      <div className={styles.boxName}>
        <p style={{ fontSize: '.85rem' }} className={styles.name}>
          {!activeProfileOptions ? name && userLogged?.name : 'Loggout'}
        </p>
      </div>
    </div>
  );
};
