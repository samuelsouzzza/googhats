import styles from './ToolBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faNoteSticky,
  faImage,
  faFaceSmile,
} from '@fortawesome/free-regular-svg-icons';

export const ToolBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.toolItem}>
        <FontAwesomeIcon icon={faImage} />
      </div>
      <div className={styles.toolItem}>
        <FontAwesomeIcon icon={faNoteSticky} />
      </div>
      <div className={styles.toolItem}>
        <FontAwesomeIcon icon={faFaceSmile} />
      </div>
    </div>
  );
};
