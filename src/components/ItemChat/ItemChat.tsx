import styles from './ItemChat.module.css';
import Image from 'next/image';

type ItemChatProps = React.ComponentProps<'div'> & {
  nameContact: string;
  lastMessage?: string;
};

export const ItemChat = ({
  nameContact,
  lastMessage,
  ...props
}: ItemChatProps) => {
  return (
    <div className={styles.container} {...props}>
      <Image
        src={'/user.png'}
        height={50}
        width={50}
        alt='Foto de perfil dos usuários'
      />
      <div className={styles.boxTextItem}>
        <p className={styles.nameContact}>{nameContact}</p>
        <p className={styles.previewMessage}>{lastMessage}</p>
      </div>
    </div>
  );
};
