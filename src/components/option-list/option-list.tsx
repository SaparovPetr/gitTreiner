import React, { StrictMode, useEffect, useState } from 'react';
import styles from './option-list.module.css';
import { TOneWord } from '@utils-types';
import { getRandomElement } from '../../utils/get-random-element';
import { myBase } from '../../wordBase';
import { shuffle } from '../../utils/shuffle-array';
import { deleteWord } from '../../services/thunks/thunk';
// import {
//   selectCurrientLanguage,
//   switchLanguageState
// } from '../../services/slices/translation-slace';
import { useAppDispatch, useAppSelector } from '../../services/store';

const OptionList = (targerO: TOneWord) => {
  const second = getRandomElement(myBase);
  const third = getRandomElement(myBase);
  const fourth = getRandomElement(myBase);
  const shuffledArrey = shuffle([targerO, second, third, fourth]);
  const [preparedArrey, setArrey] = useState(shuffledArrey);
  const dispatch = useAppDispatch();
  // const currientLanguage = useAppSelector(selectCurrientLanguage);

  const skipWordCallback = (id: string) => {
    dispatch(deleteWord(id));
    // if (currientLanguage === 'inRussian') {
    //   dispatch(switchLanguageState('inEnglish'));
    // }
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
