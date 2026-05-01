import { RoundButton } from '@components/atoms/RoundButton/RoundButton';

import styles from './ErrorHint.module.css';
import { useMdSelectors } from '@zStore/zMdState';

type TErrorHintProps = {
  closeModal: () => void;
};

export const ErrorHint = ({ closeModal }: TErrorHintProps) => {
  const { targetObject } = useMdSelectors();

  return (
    <div className={styles.hintContainer}>
      <div className={styles.phraseZone}>
        {targetObject.targetWord} - {targetObject.translating}
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
