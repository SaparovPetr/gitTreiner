import { FC } from 'react';

import { AppMode } from '@utils-types';
import { threeThousandWordBase } from '@word-bases/3k';
import { aWordBase } from '@word-bases/a';
import { bOneWordBase } from '@word-bases/b-one';
import { bTwoWordBase } from '@word-bases/b-two';
import { difWordBase } from '@word-bases/dif';
import { useNavigate } from 'react-router-dom';

import styles from './NotFoundPage.module.css';
import { useCollectionZ } from '@zStore/zCollectionState';
import { modeSelectors } from '@zStore/zModeStore';

export const NotFound404: FC = () => {
  const { modeState } = modeSelectors();
  const setCollectionState = useCollectionZ(
    (state) => state.setCollectionState
  );

  const navigate = useNavigate();

  const goToBack = () => {
    if (modeState === AppMode.Dif) {
      setCollectionState(difWordBase);
    }
    if (modeState === AppMode.ThreeK) {
      setCollectionState(threeThousandWordBase);
    }
    if (modeState === AppMode.A) {
      setCollectionState(aWordBase);
    }
    if (modeState === AppMode.B1) {
      setCollectionState(bOneWordBase);
    }
    if (modeState === AppMode.B2) {
      setCollectionState(bTwoWordBase);
    }
    navigate(-1);
  };

  return (
    <main className={styles.section}>
      <div className={styles.page_not_found}>
        <h1>smth went wrong 😒</h1>
        <p>page not found</p>
        <button className={styles.button} onClick={goToBack}>
          go to back
        </button>
      </div>
    </main>
  );
};
