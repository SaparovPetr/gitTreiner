import React from 'react';

import { selectCollection } from '@slices/words-slice';

import { currientDate } from '../../utils/currient-date';
import { useAppSelector } from '@//services/store';

const SettingModalContent = () => (
  // const collection = useAppSelector(selectCollection);

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
    </div>
  </div>
);
export default SettingModalContent;
