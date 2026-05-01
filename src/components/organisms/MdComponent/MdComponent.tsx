import { getMDcontent } from '@slices/md-slice';
import MarkDown from 'markdown-to-jsx';

import styles from './MdComponent.module.css';
import { useAppSelector } from '../../../services/store';
import { useMdSelectors_z } from '@zStore/zMdState_z';

export const MdComponent = ({}) => {
  const content = useAppSelector(getMDcontent); // РТК
  const { fullFileName_z, targetObject_z, mdContent_z, requestStatus_z } =
    useMdSelectors_z();

  return (
    <div className={styles.mdContainer}>
      <MarkDown>{content}</MarkDown>
    </div>
  );
};
