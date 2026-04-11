import { FC } from 'react';

import { makeCollection } from '@slices/words-slice';
import { AppMode } from '@utils-types';
import { threeThousandWordBase } from '@word-bases/3k';
import { aWordBase } from '@word-bases/a';
import { bOneWordBase } from '@word-bases/b-one';
import { bTwoWordBase } from '@word-bases/b-two';
import { difWordBase } from '@word-bases/dif';
import { useNavigate } from 'react-router-dom';

import styles from './NotFoundPage.module.css';
import { useAppDispatch } from '../../../services/store';
import { useModeZ } from '@zStore/zModeStore';

export const NotFound404: FC = () => {
  const dispatch = useAppDispatch(); // РТК
  const modeState = useModeZ((state) => state.modeState);

  const navigate = useNavigate();

  const goToBack = () => {
    if (modeState === AppMode.Dif) {
      dispatch(makeCollection(difWordBase));
    }
    if (modeState === AppMode.ThreeK) {
      dispatch(makeCollection(threeThousandWordBase));
    }
    if (modeState === AppMode.A) {
      dispatch(makeCollection(aWordBase));
    }
    if (modeState === AppMode.B1) {
      dispatch(makeCollection(bOneWordBase));
    }
    if (modeState === AppMode.B2) {
      dispatch(makeCollection(bTwoWordBase));
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
