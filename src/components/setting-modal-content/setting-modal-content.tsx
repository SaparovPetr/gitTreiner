import { selectCollection } from '@slices/words-slice';
import { TSettingModalContentProps } from '@utils-types';

import styles from './setting-modal-content.module.css';
import { useAppSelector } from '../../services/store';
import { currientDate } from '../../utils/currient-date';
import LabeledInput from '../labeled-input/labeled-input';
import { RoundButton } from '../round-button/round-button';

const SettingModalContent = ({ closeModal }: TSettingModalContentProps) => {
  const collection = useAppSelector(selectCollection);

  return (
    <div className={styles.settingModalContainer}>
      <h2 className={styles.modalHeading}>Settings</h2>

      <div className={styles.statusWrapper}>
        <h3 className={styles.itemLabel}>Status:</h3>
        <div className={styles.status}>
          <div> remain: {collection.length}</div>
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
        keyInLocalStorage={'linkToBot'}
        lableContent={'AI server:'}
      />

      <RoundButton disabled={false} onClickFunc={closeModal}>
        ✕
      </RoundButton>
    </div>
  );
};
export default SettingModalContent;
