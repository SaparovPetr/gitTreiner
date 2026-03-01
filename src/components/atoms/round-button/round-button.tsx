import { TButtonProps } from '@utils-types';

import styles from './round-button.module.css';

export const RoundButton = ({
  children,
  onClickFunc,
  disabled
}: TButtonProps) => (
  <>
    <button className={styles.button} onClick={onClickFunc} disabled={disabled}>
      {children}
    </button>
  </>
);
