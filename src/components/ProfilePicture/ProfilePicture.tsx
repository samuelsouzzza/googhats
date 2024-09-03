import styles from './ProfilePicture.module.css';
import Image from 'next/image';

type ProfilePictureProps = {
  path: string;
  online?: boolean;
  size: number;
};

export const ProfilePicture = ({ path, online, size }: ProfilePictureProps) => {
  return (
    <div className={styles.container}>
      <Image
        src={path}
        height={size}
        width={size}
        alt='Minha foto de perfil'
        className={styles.photo}
      />
      <span
        className={styles.status}
        style={{
          backgroundColor: `${online ? 'var(--primary)' : ''}`,
        }}
      />
    </div>
  );
};
