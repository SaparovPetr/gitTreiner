import { memo } from 'react';
import WordItem from '../word-item/word-item';
import { selectWords } from '../../services/slices/words-slice';
import { useAppSelector, useAppDispatch } from '../../services/store';
import {
  fetchWords,
  clearList,
  addIdToEachWord
} from '../../services/thunks/thunk';

import styles from './functional-component.module.css';
import { Link, useLocation } from 'react-router-dom';
import { setCounter } from '../../services/slices/counter-slice';
import { currientDate } from '../../utils/currient-date';

const FunctionalComponent = memo(() => {
  const dispatch = useAppDispatch();
  const words = useAppSelector(selectWords);

  const locationInTheApp = useLocation();

  const resetList = () => {
    dispatch(clearList());
    dispatch(fetchWords());
    dispatch(addIdToEachWord(words));
  };

  const resetListAndIncreaseCounter = () => {
    resetList();
    dispatch(setCounter(1));
    if (
      `effortCounterInStorage-${currientDate}` !==
      localStorage.key(localStorage.length - 1)
    ) {
      location.reload();
    }
  };

  const counterFromLocalStorage = localStorage.getItem(
    `effortCounterInStorage-${currientDate}`
  );

  if (words.length > 0) {
    return (
      <div className={styles.functionalArea}>
        <div className={styles.headerArea}>
          <div className={styles.logoArea}>
            <div>Git_ </div>
            <div>treiner</div>
          </div>

          <div className={styles.buttonsWrapper}>
            <div className={styles.topButtons}>
              <div className={styles.button}>{words.length}</div>
              <div className={styles.button}>
                {counterFromLocalStorage ? counterFromLocalStorage : 0}
              </div>
            </div>

            <div className={styles.bottomButtons}>
              <div className={styles.button} onClick={resetList}>
                ↺
              </div>
              <Link
                className={styles.button}
                to={'/gitTreiner/word'}
                state={{ backgroundLocation: locationInTheApp }}
              >
                &uarr;
              </Link>
            </div>
          </div>
        </div>

        {<WordItem key={words[0].id} {...words[0]} />}
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <div className={styles.functionalArea}>
        <div className={styles.success}>
          <div>🤘</div>
          <div>Let's try again?</div>
          <button
            className={styles.button}
            onClick={resetListAndIncreaseCounter}
          >
            ↺
          </button>
        </div>
      </div>
    );
  }
});

export default FunctionalComponent;
