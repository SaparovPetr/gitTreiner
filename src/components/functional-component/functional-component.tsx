import React, { StrictMode, useEffect } from 'react';
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

const FunctionalComponent = memo(() => {
  const dispatch = useAppDispatch();
  const words = useAppSelector(selectWords);

  const resetList = () => {
    dispatch(clearList());
    dispatch(fetchWords());
    dispatch(addIdToEachWord(words));
  };

  if (words.length > 0) {
    return (
      <div className={styles.functionalArea}>
        <div className={styles.buttonsWrapper}>
          <div className={styles.wordsCounterWrapper}>
            <div className={styles.wordsCounter}>{words.length}</div>
          </div>
          <div className={styles.refreshButton} onClick={resetList}>
            ↺
          </div>
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
          <button className={styles.refreshButton} onClick={resetList}>
            ↺
          </button>
        </div>
      </main>
    );
  }
});

export default FunctionalComponent;
