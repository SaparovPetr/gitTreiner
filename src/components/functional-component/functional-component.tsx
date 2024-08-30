import { memo } from 'react';

import { AppMode } from '@utils-types';

import styles from './functional-component.module.css';
import { setCounter } from '../../services/slices/counter-slice';
import { selectModeState, setMode } from '../../services/slices/mode-slice';
import { selectWords } from '../../services/slices/words-slice';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { clearList, addIdToEachWord } from '../../services/thunks/thunk';
import { currientDate } from '../../utils/currient-date';
import WordItem from '../word-item/word-item';

const FunctionalComponent = memo(() => {
  const dispatch = useAppDispatch();
  const words = useAppSelector(selectWords);
  const currientMode = useAppSelector(selectModeState);

  const resetListAndIncreaseCounter = () => {
    dispatch(clearList());
    dispatch(addIdToEachWord(words));
    dispatch(setCounter(1));
    location.reload();
  };

  const currientModeFromLocalStorage = localStorage.getItem(`currientMode`);

  const counterFromLocalStorage = localStorage.getItem(
    `effortCounterInStorage-${currientDate}`
  );

  const changeMode = () => {
    if (currientMode === AppMode.Large) {
      dispatch(setMode(AppMode.Small));
    }
    if (currientMode === AppMode.Small) {
      dispatch(setMode(AppMode.Large));
    }
  };

  if (words.length > 0) {
    return (
      <div className={styles.functionalArea}>
        <div className={styles.headerArea}>
          <div className={styles.logoArea} onClick={changeMode}>
            <div>Git_ </div>
            <div>
              treiner
              <span className={styles.lable}>
                {currientModeFromLocalStorage}
              </span>
            </div>
          </div>

          <div className={styles.buttonsWrapper}>
            <div className={styles.button}> remain: {words.length}</div>
            <div className={styles.button}>
              today: {counterFromLocalStorage ? counterFromLocalStorage : 0}
            </div>
          </div>
        </div>

        <WordItem key={words[0].id} {...words[0]} />
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <div className={styles.functionalArea}>
        <div className={styles.success}>
          <div>🥳</div>
          <div>Let's go to English!</div>
          <button
            className={styles.button}
            onClick={resetListAndIncreaseCounter}
          >
            →
          </button>
        </div>
      </div>
    );
  }
});

export default FunctionalComponent;
