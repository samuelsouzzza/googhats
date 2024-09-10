import { IChat } from '@/@types/types';
import styles from './ItemChat.module.css';
import { ProfilePicture } from '../ProfilePicture/ProfilePicture';
import { formatUpdatedChat } from '@/utils/formatUpdatedChat';
import { UseGlobalContext } from '@/globals/GlobalContext';

type ItemChatProps = React.ComponentProps<'div'> & {
  data: IChat;
};

export const ItemChat = ({ data, ...props }: ItemChatProps) => {
  const { userLogged } = UseGlobalContext();

  const otherParticipant = data.participants.find(
    (p) => p._id !== userLogged?._id
  );

  return (
    <div className={`${styles.container} fadeIn`} {...props}>
      <div className={styles.box}>
        <ProfilePicture
          path={`${otherParticipant?.profilePic}`}
          size={50}
          online={otherParticipant?.online}
        />
        <div className={styles.boxTextItem}>
          <p className={styles.nameContact}>{otherParticipant?.name}</p>
          <p className={styles.previewMessage}>
            {data.messages[data?.messages?.length - 1]?.text || ''}
          </p>
        </div>
      </div>
      <div className={styles.boxInfoChat}>
        <p className={styles.updatedChat}>
          {formatUpdatedChat(data?.updatedAt)}
        </p>
      </div>
    </div>
  );
};
