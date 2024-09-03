import { IChat } from '@/@types/types';
import styles from './ItemChat.module.css';
import { ProfilePicture } from '../ProfilePicture/ProfilePicture';
import { formatUpdatedChat } from '@/utils/formatUpdatedChat';

type ItemChatProps = React.ComponentProps<'div'> & {
  data: IChat;
};

export const ItemChat = ({ data, ...props }: ItemChatProps) => {
  return (
    <div className={`${styles.container} fadeIn`} {...props}>
      <div className={styles.box}>
        <ProfilePicture
          path={`${data.participants[1].profilePic}`}
          size={50}
          online={data.participants[1].online}
        />
        <div className={styles.boxTextItem}>
          <p className={styles.nameContact}>{data.participants[1].name}</p>

          {/* <div className={styles.boxPreview}> */}
          <p className={styles.previewMessage}>
            {data.messages[data.messages.length - 1]?.text || ''}
          </p>
          {/* </div> */}
        </div>
      </div>
      <p className={styles.updatedChat}>{formatUpdatedChat(data?.updatedAt)}</p>
    </div>
  );
};
