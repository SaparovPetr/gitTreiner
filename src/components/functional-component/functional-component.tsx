import React, { StrictMode, useEffect, useState } from 'react';
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

const FunctionalComponent = memo(() => {
  const [effortCounter, setEffortCounter] = useState(0);
  const dispatch = useAppDispatch();
  const words = useAppSelector(selectWords);
  const location = useLocation();

  const resetList = () => {
    dispatch(clearList());
    dispatch(fetchWords());
    dispatch(addIdToEachWord(words));
  };

  const resetListAndIncreaseCounter = () => {
    resetList();
    setEffortCounter(effortCounter + 1);
  };

  if (words.length > 0) {
    return (
      <div className={styles.functionalArea}>
        <div className={styles.buttonsWrapper}>
          <div className={styles.button}>{words.length}</div>
          <div className={styles.button}>{`${5 - effortCounter}/5`}</div>
          <div className={styles.button} onClick={resetList}>
            ↺
          </div>
          <Link
            className={styles.button}
            to={'/gitTreiner/word'}
            state={{ backgroundLocation: location }}
          >
            &uarr;
          </Link>
        </div>
        {<WordItem key={words[0].id} {...words[0]} />}
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <main className={styles.functionalArea}>
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
      </main>
    );
  }
});

export default FunctionalComponent;
