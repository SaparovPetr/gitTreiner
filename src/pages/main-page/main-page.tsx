import { FC } from 'react';

import SuccessComponent from '@components/success-component/success-component';
import WelcomeComponent from '@components/welcome-component/welcome-component';
import WordItem from '@components/word-item/word-item';
import { selectModeState, setMode } from '@slices/mode-slice';
import { makeCollection, selectCollection } from '@slices/words-slice';
import { isFirstStart } from '@utils/localstorage-functionality';
import { AppMode } from '@utils-types';
import { threeThousandWordBase } from '@word-bases/3k';
import { aWordBase } from '@word-bases/a';
import { bOneWordBase } from '@word-bases/b-one';
import { bTwoWordBase } from '@word-bases/b-two';
import { difWordBase } from '@word-bases/dif';
import { Link, useLocation } from 'react-router-dom';

import styles from './main-page.module.css';
import { useAppDispatch, useAppSelector } from '../../services/store';

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const collection = useAppSelector(selectCollection);
  const currientMode = useAppSelector(selectModeState);
  const locationInTheApp = useLocation();

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
      <main className={styles.mainContainer}>
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
            <p className={styles.text}>≡</p>
          </Link>
        </div>
        <WordItem key={collection[0].id} {...collection[0]} />
      </main>
    );
  }

  if (!isFirstStart) {
    return (
      <main className={styles.mainContainer}>
        <WelcomeComponent />
      </main>
    );
  }

  // (заметка № 13)
  if (collection.length === 0 && isFirstStart) {
    return (
      <main className={styles.mainContainer}>
        <SuccessComponent />
      </main>
    );
  }
};
