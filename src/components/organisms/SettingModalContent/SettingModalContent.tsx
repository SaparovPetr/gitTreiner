import styles from './SettingModalContent.module.css';
import { currientDate } from '../../../utils/currientDate';
import { RoundButton } from '../../atoms/RoundButton/RoundButton';
import { LabeledInput } from '../../molecules/LabeledInput/LabeledInput';
import { useCollectionSelectors } from '@store/useCollectionStore';

type TSettingModalContentProps = {
  closeModal?: () => void;
};

export const SettingModalContent = ({
  closeModal
}: TSettingModalContentProps) => {
  const { collectionState } = useCollectionSelectors();

  return (
    <div className={styles.settingModalContainer}>
      <h2 className={styles.modalHeading}>Settings</h2>

      <div className={styles.statusWrapper}>
        <h3 className={styles.itemLabel}>Status:</h3>
        <div className={styles.status}>
          <div> remain: {collectionState.length}</div>
          <div>
            today:{' '}
            {localStorage.getItem(`effortCounterInStorage-${currientDate}`)
              ? localStorage.getItem(`effortCounterInStorage-${currientDate}`)
              : 0}
          </div>
        </div>
      </div>

      <LabeledInput
        keyInLocalStorage={'UserName'}
        lableContent={'GitHub name:'}
      />

      <LabeledInput
        keyInLocalStorage={'UserRepo'}
        lableContent={'Repo name:'}
      />

      <LabeledInput
        keyInLocalStorage={'aiKey'}
        lableContent={'Your api key:'}
      />

      <RoundButton isFitContent disabled={false} onClickFunc={closeModal}>
        ✕
      </RoundButton>
    </div>
  );
};
