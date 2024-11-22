import React from 'react';

import { selectCollection } from '@slices/words-slice';
import { useNavigate } from 'react-router-dom';

import styles from './setting-modal-content.module.css';
import { currientDate } from '../../utils/currient-date';
import LabeledInput from '../LabeledInput/LabeledInput';
import { setShowModal } from '@//services/slices/modal-slice';
import { useAppDispatch, useAppSelector } from '@//services/store';

const SettingModalContent = () => {
  const collection = useAppSelector(selectCollection);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
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

      <a
        className={styles.button}
        onClick={() => {
          dispatch(setShowModal(false));
          setTimeout(onClose, 200);
        }}
      >
        close
      </a>
    </div>
  );
};
export default SettingModalContent;
