import { selectCollection } from '@slices/words-slice';

import styles from './SettingModalContent.module.css';
import { useAppSelector } from '../../../services/store';
import { currientDate } from '../../../utils/currient-date';
import LabeledInput from '../../atoms/LabeledInput/LabeledInput';
import { RoundButton } from '../../atoms/RoundButton/RoundButton';

type TSettingModalContentProps = {
  closeModal?: () => void;
};

const SettingModalContent = ({ closeModal }: TSettingModalContentProps) => {
  const collection = useAppSelector(selectCollection); // РТК

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
        keyInLocalStorage={'aiKey'}
        lableContent={'Your api key:'}
      />

      <RoundButton disabled={false} onClickFunc={closeModal}>
        ✕
      </RoundButton>
    </div>
  );
};
export default SettingModalContent;
