import { RoundButton } from '@components/atoms/RoundButton/RoundButton';
import { selectPickedWordObject } from '@slices/md-slice';

import styles from './ErrorHint.module.css';
import { useAppSelector } from '../../../services/store';
import { useMdSelectors_z } from '@zStore/zMdState_z';

type TErrorHintProps = {
  closeModal: () => void;
};

export const ErrorHint = ({ closeModal }: TErrorHintProps) => {
  const { targetWord, translating } = useAppSelector(selectPickedWordObject); // РТК
  const { fullFileName_z, targetObject_z, mdContent_z, requestStatus_z } =
    useMdSelectors_z();

  return (
    <div className={styles.hintContainer}>
      <div className={styles.phraseZone}>
        {targetWord} - {translating}
      </div>
      <p className={styles.hintText}>
        No note data was retrieved. 😥 Please check the GitHub data in your
        settings.
      </p>
      <RoundButton isFitContent disabled={false} onClickFunc={closeModal}>
        ✕
      </RoundButton>
    </div>
  );
};
