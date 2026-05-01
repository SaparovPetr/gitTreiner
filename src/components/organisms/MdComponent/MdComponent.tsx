import MarkDown from 'markdown-to-jsx';

import styles from './MdComponent.module.css';
import { useMdSelectors } from '@zStore/zMdState';

export const MdComponent = ({}) => {
  const { mdContent } = useMdSelectors();

  return (
    <div className={styles.mdContainer}>
      <MarkDown>{mdContent}</MarkDown>
    </div>
  );
};
