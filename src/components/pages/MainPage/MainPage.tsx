import { FC, useEffect, useState } from 'react';

import { WriteTranslation } from '@components/organisms/WriteTranslation/WriteTranslation';
import { SearchTemplate } from '@components/templates/SearchTemplate/SearchTemplate';
import { SuccessTemplate } from '@components/templates/SuccessTemplate/SuccessTemplate';
import { TrialItemTemplate } from '@components/templates/TrialItemTemplate/TrialItemTemplate';
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
import { useModeActions, useModeSelectors } from '@store/modeStore';
import {
  useCollectionActions,
  useCollectionSelectors
} from '@store/collectionState';

export const MainPage: FC = () => {
  const { setCollectionState } = useCollectionActions();
  const { collectionState } = useCollectionSelectors();
  const { setModeState } = useModeActions();
  const { modeState } = useModeSelectors();

  const [trialRegime, setTrialRegime] = useState(false);
  const [entryCard, setEntryCard] = useState(false);
  const locationInTheApp = useLocation();

  useEffect(() => {
    if (trialRegime) {
      if (collectionState.length % 3 === 0) {
        setEntryCard(true);
      } else {
        if (modeState === AppMode.Es400) {
          audioCallback(collectionState[0].audioURL);
        } else {
          audioCallback(
            `https://vimbox-tts.skyeng.ru/api/v1/tts?text=${collectionState[0].targetWord}&lang=en&voice=male_2`
          );
        }
        setEntryCard(false);
      }
    }
  }, [collectionState, trialRegime]);

  /**  Колбек клика по логотипу  */
  const changeMode = () => {
    if (modeState === AppMode.Dif) {
      setModeState(AppMode.ThreeK);
      setCollectionState(threeThousandWordBase);
    }
    if (modeState === AppMode.ThreeK) {
      setModeState(AppMode.A);
      setCollectionState(aWordBase);
    }
    if (modeState === AppMode.A) {
      setModeState(AppMode.B1);
      setCollectionState(bOneWordBase);
    }
    if (modeState === AppMode.B1) {
      setModeState(AppMode.B2);
      setCollectionState(bTwoWordBase);
    }

    if (modeState === AppMode.B2) {
      setModeState(AppMode.Es400);
      setCollectionState(spanish400);
    }

    if (modeState === AppMode.Es400) {
      setModeState(AppMode.Es500);
      setCollectionState(spanish500);
    }
    if (modeState === AppMode.Es500) {
      setModeState(AppMode.Dif);
      setCollectionState(difWordBase);
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
      {collectionState.length > 0 && isFirstStart && (
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
            <TrialItemTemplate
              key={collectionState[0].id}
              {...collectionState[0]}
            />
          )}

          {trialRegime && entryCard && (
            <WriteTranslation
              key={collectionState[0].id}
              {...collectionState[0]}
            />
          )}

          {!trialRegime && <SearchTemplate />}
        </>
      )}
      {/* (заметка № 13) */}
      {collectionState.length === 0 && isFirstStart && <SuccessTemplate />}
    </main>
  );
};
