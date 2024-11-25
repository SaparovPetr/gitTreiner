import { FC } from 'react';

import { RoundButton } from '@components/round-button/round-button';
import { setCounter } from '@slices/counter-slice';
import { selectModeState } from '@slices/mode-slice';
import { makeCollection } from '@slices/words-slice';
import { AppMode } from '@utils-types';
import { threeThousandWordBase } from '@word-bases/3k';
import { aWordBase } from '@word-bases/a';
import { bOneWordBase } from '@word-bases/b-one';
import { bTwoWordBase } from '@word-bases/b-two';
import { difWordBase } from '@word-bases/dif';

import styles from './success-component.module.css';
import { useAppDispatch, useAppSelector } from '../../services/store';

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
