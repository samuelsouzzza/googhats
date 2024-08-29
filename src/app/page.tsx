import styles from './page.module.css';
import { TopBar } from '@/components/TopBar/TopBar';
import { Chats } from '@/components/Chats/Chats';
import { OpenedChat } from '@/components/OpenedChat/OpenedChat';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <TopBar />
      <Chats />
      <OpenedChat />
    </div>
  );
}
