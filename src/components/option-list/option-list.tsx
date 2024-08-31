import { TOneWord } from '@utils-types';

import styles from './option-list.module.css';
import { useAppDispatch } from '../../services/store';
import { deleteWord } from '../../services/thunks/thunk';
import { getCurrientBase } from '../../utils/get-currient-base';
import { getRandomElement } from '../../utils/get-random-element';
import { currientModeFromLocalStorage } from '../../utils/localstorage-functionality';
import { shuffle } from '../../utils/shuffle-array';

const OptionList = (targetObject: TOneWord) => {
  const currientBase = getCurrientBase(currientModeFromLocalStorage);
  const thirdOption = getRandomElement(currientBase);
  const secondOption = getRandomElement(currientBase);
  const fourthOption = getRandomElement(currientBase);
  const shuffledArrey = shuffle([
    targetObject,
    secondOption,
    thirdOption,
    fourthOption
  ]);
  const dispatch = useAppDispatch();

  const skipWordCallback = (id: string) => {
    dispatch(deleteWord(id));
  };

  const choseOption = (e: any) => {
    if (e.target.textContent === targetObject.translating) {
      skipWordCallback(targetObject.id);
    } else {
      e.target.style.color = 'gray';
      e.target.style.border = '1px solid gray';
    }
  };

  return (
    <div className={styles.fourOptions}>
      <div key={2} className={styles.option} onClick={choseOption}>
        {shuffledArrey[0].translating}
      </div>
      <div key={3} className={styles.option} onClick={choseOption}>
        {shuffledArrey[1].translating}
      </div>
      <div key={4} className={styles.option} onClick={choseOption}>
        {shuffledArrey[2].translating}
      </div>
      <div key={5} className={styles.option} onClick={choseOption}>
        {shuffledArrey[3].translating}
      </div>
    </div>
  );
};

export default OptionList;
