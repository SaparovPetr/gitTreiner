import React from 'react';

import { selectCollection } from '@slices/words-slice';
import { useNavigate } from 'react-router-dom';

import { currientDate } from '../../utils/currient-date';
import Input from '../functional-component/input/input';
import { setShowModal } from '@//services/slices/modal-slice';
import { useAppDispatch, useAppSelector } from '@//services/store';

const SettingModalContent = () => {
  // const collection = useAppSelector(selectCollection);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClose = () => {
    navigate(-1);
  };

  return (
    <div>
      <h2>Settings</h2>
      <div className='item'>
        {' '}
        remain:
        {/* {collection.length} */}
      </div>
      <div className='item'>
        today:{' '}
        {localStorage.getItem(`effortCounterInStorage-${currientDate}`)
          ? localStorage.getItem(`effortCounterInStorage-${currientDate}`)
          : 0}
        <Input />
        <a
          // className={styles.button}
          onClick={() => {
            dispatch(setShowModal(false));
            setTimeout(onClose, 200);
          }}
        >
          close
        </a>
      </div>
    </div>
  );
};
export default SettingModalContent;
