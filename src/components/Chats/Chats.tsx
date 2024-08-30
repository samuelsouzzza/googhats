import styles from './Chats.module.css';
import { ItemChat } from '../ItemChat/ItemChat';

export const Chats = () => {
  return (
    <section className={styles.container}>
      <h3>Suas conversas</h3>
      <div>
        <ItemChat />
        <ItemChat />
        <ItemChat />
        <ItemChat />
        <ItemChat />
        <ItemChat />
        <ItemChat />
        <ItemChat />
        <ItemChat />
        <ItemChat />
        <ItemChat />
        <ItemChat />
      </div>
    </section>
  );
};
