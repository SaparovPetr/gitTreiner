import React, { useState } from 'react';

import { TOneWord } from '@utils-types';

import styles from './option-list.module.css';
import { useAppDispatch } from '../../services/store';
import { deleteWord } from '../../services/thunks/thunk';
import { getRandomElement } from '../../utils/get-random-element';
import { shuffle } from '../../utils/shuffle-array';
import { myBase } from '../../word-bases/wordBase';

const OptionList = (targerO: TOneWord) => {
  const second = getRandomElement(myBase);
  const third = getRandomElement(myBase);
  const fourth = getRandomElement(myBase);
  const shuffledArrey = shuffle([targerO, second, third, fourth]);
  const [preparedArrey, setArrey] = useState(shuffledArrey);
  const dispatch = useAppDispatch();

  const skipWordCallback = (id: string) => {
    dispatch(deleteWord(id));
  };

  const choseOption = (e: any) => {
    if (e.target.textContent === targerO.translating) {
      skipWordCallback(targerO.id);
    } else {
      e.target.style.color = 'gray';
      e.target.style.border = '1px solid gray';
    }
  };

  return (
    <div className={styles.fourOptions}>
      <div key={2} className={styles.option} onClick={choseOption}>
        {preparedArrey[0].translating}
      </div>
      <div key={3} className={styles.option} onClick={choseOption}>
        {preparedArrey[1].translating}
      </div>
      <div key={4} className={styles.option} onClick={choseOption}>
        {preparedArrey[2].translating}
      </div>
      <div key={5} className={styles.option} onClick={choseOption}>
        {preparedArrey[3].translating}
      </div>
    </div>
  );
};

export default OptionList;
