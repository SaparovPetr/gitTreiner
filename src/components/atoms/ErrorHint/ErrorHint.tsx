import { ReactElement } from 'react';

import { RoundButton } from '@components/atoms/RoundButton/RoundButton';
import { selectPickedWordObject } from '@slices/md-slice';

import styles from './ErrorHint.module.css';
import { useAppSelector } from '../../../services/store';

type TErrorHintProps = {
  children?: ReactElement;
  closeModal: () => void;
};

export const ErrorHint = ({ closeModal }: TErrorHintProps) => {
  const word = useAppSelector(selectPickedWordObject); // РТК

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
