import { useState } from 'react';

import { getCurrientBase } from '@utils/getCurrientBase';
import { getRandomElement } from '@utils/getRandomElement';
import { currientModeFromLocalStorage } from '@utils/localStorageFunctionality';
import { shuffle } from '@utils/shuffleArray';
import { TOneWord } from '@utils-types';

import styles from './OptionList.module.css';
import { useCollectionActions } from '@store/useCollectionStore';

/** компоненет списка ответов */
export const OptionList =
  // (заметка № 8)
  (targetObject: TOneWord) => {
    const { setTrimmedCollectionState } = useCollectionActions();

    const currientBase = getCurrientBase(currientModeFromLocalStorage);
    // (заметка № 9)
    const thirdOption = getRandomElement(currientBase);
    const secondOption = getRandomElement(currientBase);
    const fourthOption = getRandomElement(currientBase);
    // (заметка № 10)
    const shuffledArrey = shuffle([
      targetObject,
      secondOption,
      thirdOption,
      fourthOption
    ]);

    // (заметка № 11)
    /** запись в стейт подготовленного массива для его сохранения при ререндеринге */
    const [preparedArrey] = useState(shuffledArrey);

    /** удаление Рабочего элемента из Коллекции */
    const skipWordCallback = (id: string) => {
      setTrimmedCollectionState(id);
    };

    // (заметка № 12)
    const choseOption = (e: any) => {
      if (
        targetObject.id &&
        e.target.textContent === targetObject.translating
      ) {
        skipWordCallback(targetObject.id);
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
