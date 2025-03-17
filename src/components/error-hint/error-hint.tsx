import { RoundButton } from '@components/round-button/round-button';
import { selectPickedWordObject } from '@slices/md-slice';
import { TModalProps } from '@utils-types';

import styles from './error-hint.module.css';
import { useAppSelector } from '../../services/store';

export const ErrorHint = ({ closeModal }: TModalProps) => {
  const word = useAppSelector(selectPickedWordObject);

  return (
    <div className={styles.hintContainer}>
      <div className={styles.phraseZone}>
        {word?.targetWord} - {word?.translating}
      </div>
      <div className={styles.hintText}>
        Данные о заметке не получены. Проверьте корректность данных Гитхаба в
        настройках.
      </div>
      <RoundButton disabled={false} onClickFunc={closeModal}>
        ✕
      </RoundButton>
    </div>
  );
};

export default ErrorHint;
