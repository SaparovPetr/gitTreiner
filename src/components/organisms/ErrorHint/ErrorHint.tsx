import { RoundButton } from '@components/atoms/RoundButton/RoundButton';

import styles from './ErrorHint.module.css';
import { useMdSelectors_z } from '@zStore/zMdState_z';

type TErrorHintProps = {
  closeModal: () => void;
};

export const ErrorHint = ({ closeModal }: TErrorHintProps) => {
  const { targetObject_z } = useMdSelectors_z();

  return (
    <div className={styles.hintContainer}>
      <div className={styles.phraseZone}>
        {targetObject_z.targetWord} - {targetObject_z.translating}
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
