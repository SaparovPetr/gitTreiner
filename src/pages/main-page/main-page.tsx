import { FC, useEffect, useState } from 'react';

import Search from '@components/search/search';
import Success from '@components/success/success';
import Welcome from '@components/welcome/welcome';
import WordItem from '@components/word-item/word-item';
import WriteTranslation from '@components/writeTranslation/write-translation';
import { selectModeState, setMode } from '@slices/mode-slice';
import { makeCollection, selectCollection } from '@slices/words-slice';
import { audioCallback } from '@utils/audio-callback';
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
  const [trialRegime, setTrialRegime] = useState(false);
  const [entryCard, setEntryCard] = useState(false);
  const dispatch = useAppDispatch();
  const collection = useAppSelector(selectCollection);
  const currientMode = useAppSelector(selectModeState);
  const locationInTheApp = useLocation();

  useEffect(() => {
    if (trialRegime) {
      if (collection.length % 3 === 0) {
        setEntryCard(true);
      } else {
        audioCallback(collection[0].targetWord);
        setEntryCard(false);
      }
    }
  }, [collection.length, trialRegime]);

  /**
   * Колбек клика по логотипу
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

  /**
   * Колбек клика по кнопке смены режимов поиска и подготовки
   */
  const changeRegime = () => {
    trialRegime ? setTrialRegime(false) : setTrialRegime(true);
  };

  return (
    <main className={styles.mainContainer}>
      {collection.length > 0 && isFirstStart && (
        <>
          <div className={styles.headerArea}>
            <div className={styles.logoArea} onClick={changeMode}>
              <div>Git_</div>
              <div>
                treiner
                <span className={styles.lable}>{currientMode}</span>
              </div>
            </div>

            <div className={styles.buttonsArea}>
              <Link
                className={styles.settingButton}
                to='/gitTreiner/setting'
                state={{ backgroundLocation: locationInTheApp }}
              >
                <div className={styles.setButton}>≡</div>
              </Link>
              <div className={styles.modeButton} onClick={changeRegime}>
                ←
              </div>
            </div>
          </div>

          {trialRegime && !entryCard && (
            <WordItem key={collection[0].id} {...collection[0]} />
          )}

          {trialRegime && entryCard && (
            <WriteTranslation key={collection[0].id} {...collection[0]} />
          )}

          {!trialRegime && <Search />}
        </>
      )}
      {/* (TODO: добавить заметку в ReadMe) */}
      {!isFirstStart && <Welcome />}
      {/* (заметка № 13) */}
      {collection.length === 0 && isFirstStart && <Success />}
    </main>
  );
};
