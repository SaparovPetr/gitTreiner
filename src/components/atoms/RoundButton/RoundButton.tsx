import { ReactNode } from 'react';

import styles from './RoundButton.module.css';

export type TButtonProps = {
  htmlType?: string;
  children: ReactNode;
  onClickFunc?: () => void;
  disabled?: boolean;
  isFitContent?: boolean;
};

export const RoundButton = ({
  children,
  onClickFunc,
  isFitContent = false,
  disabled
}: TButtonProps) => (
  <button
    style={isFitContent ? { width: 'fit-content' } : undefined}
    className={styles.button}
    onClick={onClickFunc}
    disabled={disabled}
  >
    {children}
  </button>
);
