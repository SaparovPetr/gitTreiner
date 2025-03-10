import { getMDcontent } from '@slices/md-slice';
import MarkDown from 'markdown-to-jsx';

import styles from './md-component.module.css';
import { useAppSelector } from '../../services/store';

export const MdComponent = () => {
  const content = useAppSelector(getMDcontent);

  return (
    <div className={styles.mdContainer}>
      <MarkDown>{content}</MarkDown>
    </div>
  );
};

export default MdComponent;
