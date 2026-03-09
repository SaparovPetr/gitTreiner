import { ReactNode } from 'react';

import styles from './RoundButton.module.css';

export type TButtonProps = {
  htmlType?: string;
  children: ReactNode;
  onClickFunc?: () => void;
  disabled?: boolean;
};

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
