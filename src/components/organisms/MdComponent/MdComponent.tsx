import MarkDown from 'markdown-to-jsx';

import styles from './MdComponent.module.css';
import { useMdSelectors_z } from '@zStore/zMdState_z';

export const MdComponent = ({}) => {
  const { mdContent_z } = useMdSelectors_z();

  return (
    <div className={styles.mdContainer}>
      <MarkDown>{mdContent_z}</MarkDown>
    </div>
  );
};
