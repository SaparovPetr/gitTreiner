import { RoundButton } from '@components/round-button/round-button';
import { TModalProps } from '@utils-types';

import styles from './error-hint.module.css';

export const ErrorHint = ({ closeModal }: TModalProps) => (
  <div className={styles.hintContainer}>
    <div className={styles.hintText}>
      Данные с Гитхаба не получены. Проверьте корректность ваших учетных данных
      в настройках.
    </div>
    <RoundButton disabled={false} onClickFunc={closeModal}>
      ✕
    </RoundButton>
  </div>
);

export default ErrorHint;
