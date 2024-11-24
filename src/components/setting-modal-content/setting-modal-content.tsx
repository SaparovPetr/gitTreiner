import React from 'react';

import { selectCollection } from '@slices/words-slice';

import styles from './setting-modal-content.module.css';
import { currientDate } from '../../utils/currient-date';
import LabeledInput from '../labeled-input/labeled-input';
import { RoundButton } from '../round-button/round-button';
import { useAppSelector } from '@//services/store';

const SettingModalContent = ({ closeModal }: any) => {
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
        close
      </RoundButton>
    </div>
  );
};
export default SettingModalContent;
