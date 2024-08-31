import { MyProfile } from '../MyProfile/MyProfile';
import styles from './TopBar.module.css';
import Image from 'next/image';

export const TopBar = () => {
  return (
    <section className={styles.container}>
      <div className={styles.logoBox}>
        <Image src={'/logo.png'} height={30} width={30} alt='Logomarca' />
        <h3>GooGhats</h3>
      </div>
      <MyProfile />
    </section>
  );
};
