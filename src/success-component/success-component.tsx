import { FC } from 'react';

import styles from './success-component.module.css';
import { RoundButton } from '../components/RoundButton/RoundButton';
import { setCounter } from '../services/slices/counter-slice';
import { selectModeState } from '../services/slices/mode-slice';
import { makeCollection } from '../services/slices/words-slice';
import { useAppDispatch, useAppSelector } from '../services/store';
import { AppMode } from '../utils/types';
import { threeThousandWordBase } from '../word-bases/3k';
import { aWordBase } from '../word-bases/a';
import { bOneWordBase } from '../word-bases/b-one';
import { bTwoWordBase } from '../word-bases/b-two';
import { difWordBase } from '../word-bases/dif';

const SuccessComponent: FC = () => {
  const dispatch = useAppDispatch();

  const currientMode = useAppSelector(selectModeState);

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

  return (
    <div className={styles.success}>
      <div>🥳</div>
      <div>Great!</div>
      <div>Let's go again!</div>

      <RoundButton onClickFunc={increaseCounter} disabled={false}>
        →
      </RoundButton>
    </div>
  );
};
export default SuccessComponent;
