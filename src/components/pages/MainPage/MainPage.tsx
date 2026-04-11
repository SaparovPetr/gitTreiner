import { FC, useEffect, useState } from 'react';

import { WriteTranslation } from '@components/organisms/WriteTranslation/WriteTranslation';
import { SearchTemplate } from '@components/templates/SearchTemplate/SearchTemplate';
import { SuccessTemplate } from '@components/templates/SuccessTemplate/SuccessTemplate';
import { TrialItemTemplate } from '@components/templates/TrialItemTemplate/TrialItemTemplate';
import { makeCollection, selectCollection } from '@slices/words-slice';
import { audioCallback } from '@utils/audioCallback';
import { currientDate } from '@utils/currientDate';
import { isFirstStart } from '@utils/localStorageFunctionality';
import { AppMode } from '@utils-types';
import { threeThousandWordBase } from '@word-bases/3k';
import { aWordBase } from '@word-bases/a';
import { bOneWordBase } from '@word-bases/b-one';
import { bTwoWordBase } from '@word-bases/b-two';
import { difWordBase } from '@word-bases/dif';
import { spanish400 } from '@word-bases/spanish400';
import { spanish500 } from '@word-bases/spanish500';
import { Link, useLocation } from 'react-router-dom';

import styles from './MainPage.module.css';
import { useAppDispatch, useAppSelector } from '../../../services/store';
import { useModeZ } from '@zStore/zModeStore';

export const MainPage: FC = () => {
  const dispatch = useAppDispatch(); // РТК
  const collection = useAppSelector(selectCollection); // РТК
  const setModeState = useModeZ((state) => state.setModeState);
  const modeState = useModeZ((state) => state.modeState);

  const [trialRegime, setTrialRegime] = useState(false);
  const [entryCard, setEntryCard] = useState(false);
  const locationInTheApp = useLocation();

  useEffect(() => {
    if (trialRegime) {
      if (collection.length % 3 === 0) {
        setEntryCard(true);
      } else {
        if (modeState === AppMode.Es400) {
          audioCallback(collection[0].audioURL);
        } else {
          audioCallback(
            `https://vimbox-tts.skyeng.ru/api/v1/tts?text=${collection[0].targetWord}&lang=en&voice=male_2`
          );
        }
        setEntryCard(false);
      }
    }
  }, [collection, trialRegime]);

  /**  Колбек клика по логотипу  */
  const changeMode = () => {
    if (modeState === AppMode.Dif) {
      setModeState(AppMode.ThreeK);
      dispatch(makeCollection(threeThousandWordBase));
    }
    if (modeState === AppMode.ThreeK) {
      setModeState(AppMode.A);
      dispatch(makeCollection(aWordBase));
    }
    if (modeState === AppMode.A) {
      setModeState(AppMode.B1);
      dispatch(makeCollection(bOneWordBase));
    }
    if (modeState === AppMode.B1) {
      setModeState(AppMode.B2);
      dispatch(makeCollection(bTwoWordBase));
    }

    if (modeState === AppMode.B2) {
      setModeState(AppMode.Es400);
      dispatch(makeCollection(spanish400));
    }

    if (modeState === AppMode.Es400) {
      setModeState(AppMode.Es500);
      dispatch(makeCollection(spanish500));
    }
    if (modeState === AppMode.Es500) {
      setModeState(AppMode.Dif);
      dispatch(makeCollection(difWordBase));
    }
  };

  /**  Колбек клика по кнопке смены режимов поиска и подготовки   */
  const changeRegime = () => {
    trialRegime ? setTrialRegime(false) : setTrialRegime(true);
  };

  /** Число сделанных попыток */
  const efforts = Number(
    localStorage.getItem(`effortCounterInStorage-${currientDate}`)
  );

  return (
    <main
      className={styles.mainContainer}
      style={{
        backgroundColor:
          efforts < 10
            ? 'var(--start-bg-color)'
            : efforts < 15
              ? 'var(--second-bg-color)'
              : 'var(--third-bg-color)'
      }}
    >
      {collection.length > 0 && isFirstStart && (
        <>
          <div className={styles.headerArea}>
            <div className={styles.logoArea} onClick={changeMode}>
              <div>Git_</div>
              <div>
                treiner
                {trialRegime && (
                  <span className={styles.lable}>{modeState}</span>
                )}
              </div>
            </div>

            <div className={styles.buttonsArea}>
              <Link
                className={styles.settingButton}
                to='/setting'
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
            <TrialItemTemplate key={collection[0].id} {...collection[0]} />
          )}

          {trialRegime && entryCard && (
            <WriteTranslation key={collection[0].id} {...collection[0]} />
          )}

          {!trialRegime && <SearchTemplate />}
        </>
      )}
      {/* (заметка № 13) */}
      {collection.length === 0 && isFirstStart && <SuccessTemplate />}
    </main>
  );
};
