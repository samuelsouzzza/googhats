import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import styles from './MyProfile.module.css';
import React from 'react';

export const MyProfile = () => {
  const refProfile = React.useRef<HTMLImageElement | null>(null);
  const refSpan = React.useRef<HTMLSpanElement | null>(null);
  const [activeProfileOptions, setActiveProfileOptions] = React.useState(false);

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

  function logOut() {
    alert('Encerrou a sessão.');
  }

  return (
    <div className={styles.container}>
      <Image
        src={'/user.png'}
        height={30}
        width={30}
        alt='Foto de perfil do usuário logado'
        ref={refProfile}
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
  );
};
