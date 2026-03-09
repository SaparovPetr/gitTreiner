import { getMDcontent } from '@slices/md-slice';
import MarkDown from 'markdown-to-jsx';

import styles from './MdComponent.module.css';
import { useAppSelector } from '../../../services/store';

export const MdComponent = ({}) => {
  const content = useAppSelector(getMDcontent); // РТК

  return (
    <div className={styles.mdContainer}>
      <MarkDown>{content}</MarkDown>
    </div>
  );
};
