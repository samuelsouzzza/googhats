import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={styles.container}>
      <FontAwesomeIcon icon={faSpinner} spin />
    </div>
  );
};
