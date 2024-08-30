import styles from './ItemChat.module.css';
import Image from 'next/image';

export const ItemChat = () => {
  return (
    <div className={styles.container}>
      <Image
        src={'/user.png'}
        height={50}
        width={50}
        alt='Foto de perfil dos usuários'
      />
      <div className={styles.boxTextItem}>
        <p className={styles.nameContact}>Samuel</p>
        <p className={styles.previewMessage}>
          Pefil Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum,
          similique?
        </p>
      </div>
    </div>
  );
};
