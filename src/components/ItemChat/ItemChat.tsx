import { IChat } from '@/@types/types';
import styles from './ItemChat.module.css';
import Image from 'next/image';

type ItemChatProps = React.ComponentProps<'div'> & {
  data: IChat;
};

export const ItemChat = ({ data, ...props }: ItemChatProps) => {
  return (
    <div className={`${styles.container} fadeIn`} {...props}>
      <Image
        src={`${data.participants[1].profilePic}`}
        height={50}
        width={50}
        alt='Foto de perfil dos usuários'
        className={styles.imgProfile}
      />
      <div className={styles.boxTextItem}>
        <p className={styles.nameContact}>{data.participants[1].name}</p>
        <p className={styles.previewMessage}>
          {data.messages[data.messages.length - 1]?.text || ''}
        </p>
      </div>
    </div>
  );
};
