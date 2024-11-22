import WordItem from '@components/word-item/word-item';
import { setCounter } from '@slices/counter-slice';
import { selectModeState, setMode } from '@slices/mode-slice';
import { makeCollection, selectCollection } from '@slices/words-slice';
import { AppMode } from '@utils-types';
import { aWordBase } from '@word-bases/a';
import { bOneWordBase } from '@word-bases/b-one';
import { bTwoWordBase } from '@word-bases/b-two';
import { difWordBase } from '@word-bases/dif';
import { Link, useLocation } from 'react-router-dom';

import styles from './functional-component.module.css';
import { useAppSelector, useAppDispatch } from '../../services/store';
import {
  isFirstStart,
  markTheFirstStart
} from '../../utils/localstorage-functionality';
import { threeThousandWordBase } from '../../word-bases/3k';

const FunctionalComponent = () => {
  const dispatch = useAppDispatch();
  const collection = useAppSelector(selectCollection);
  const currientMode = useAppSelector(selectModeState);
  const locationInTheApp = useLocation();

  /**
   * Колбек для кнопки "продолжить" на экране успеха
   */
  const increaseCounter = () => {
    if (currientMode === AppMode.Dif) {
      dispatch(makeCollection(difWordBase));
    }
    if (currientMode === AppMode.ThreeK) {
      dispatch(makeCollection(threeThousandWordBase));
    }
    if (currientMode === AppMode.A) {
      dispatch(makeCollection(aWordBase));
    }
    if (currientMode === AppMode.B1) {
      dispatch(makeCollection(bOneWordBase));
    }
    if (currientMode === AppMode.B2) {
      dispatch(makeCollection(bTwoWordBase));
    }
    dispatch(setCounter(1));
  };

  /**
   * Колбек для клика по логотипу
   */
  const changeMode = () => {
    if (currientMode === AppMode.Dif) {
      dispatch(setMode(AppMode.ThreeK));
      dispatch(makeCollection(threeThousandWordBase));
    }
    if (currientMode === AppMode.ThreeK) {
      dispatch(setMode(AppMode.A));
      dispatch(makeCollection(aWordBase));
    }
    if (currientMode === AppMode.A) {
      dispatch(setMode(AppMode.B1));
      dispatch(makeCollection(bOneWordBase));
    }
    if (currientMode === AppMode.B1) {
      dispatch(setMode(AppMode.B2));
      dispatch(makeCollection(bTwoWordBase));
    }
    if (currientMode === AppMode.B2) {
      dispatch(setMode(AppMode.Dif));
      dispatch(makeCollection(difWordBase));
    }
  };

  if (collection.length > 0 && isFirstStart) {
    return (
      <div className={styles.functionalArea}>
        <div className={styles.headerArea}>
          <div className={styles.logoArea} onClick={changeMode}>
            <div>Git_</div>
            <div>
              treiner
              <span className={styles.lable}>{currientMode}</span>
            </div>
          </div>

          <Link
            className={styles.settingButton}
            to='/gitTreiner/setting'
            state={{ backgroundLocation: locationInTheApp }}
          >
            <span className={styles.text}>▽</span>
          </Link>
        </div>

        <WordItem key={collection[0].id} {...collection[0]} />
      </div>
    );
  }

  if (!isFirstStart) {
    return (
      <div className={styles.functionalArea}>
        <div className={styles.success}>
          <div>👋 </div>
          <div>Welcome to the GitTreiner!</div>
          <div>
            You can brush up words and edit Markdone notes for them from your
            GitHub.
          </div>
          <button className={styles.button} onClick={markTheFirstStart}>
            →
          </button>
        </div>
      </div>
    );
  }

  // (заметка № 13)
  if (collection.length === 0 && isFirstStart) {
    return (
      <div className={styles.functionalArea}>
        <div className={styles.success}>
          <div>🥳</div>
          <div>Great!</div>
          <div>Let's go again!</div>
          <button className={styles.button} onClick={increaseCounter}>
            →
          </button>
        </div>
      </div>
    );
  }
};

export default FunctionalComponent;
