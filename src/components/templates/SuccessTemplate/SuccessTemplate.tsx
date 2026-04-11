import { FC } from 'react';

import { RoundButton } from '@components/atoms/RoundButton/RoundButton';
import { setCounter } from '@slices/counter-slice';
import { selectModeState } from '@slices/mode-slice';
import { makeCollection } from '@slices/words-slice';
import { useAppDispatch, useAppSelector } from '@store/store';
import { AppMode } from '@utils-types';
import { threeThousandWordBase } from '@word-bases/3k';
import { aWordBase } from '@word-bases/a';
import { bOneWordBase } from '@word-bases/b-one';
import { bTwoWordBase } from '@word-bases/b-two';
import { difWordBase } from '@word-bases/dif';
import { spanish400 } from '@word-bases/spanish400';
import { spanish500 } from '@word-bases/spanish500';

import styles from './SuccessTemplate.module.css';
import { useCounterZ } from '@zStore/zCounterStore';

export const SuccessTemplate: FC = () => {
  const dispatch = useAppDispatch(); // РТК
  const currientMode = useAppSelector(selectModeState); // РТК

  const setEffortCounterState = useCounterZ(
    (state) => state.setEffortCounterState
  );

  const counterHandler = () => {
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
    if (currientMode === AppMode.Es400) {
      dispatch(makeCollection(spanish400));
    }
    if (currientMode === AppMode.Es500) {
      dispatch(makeCollection(spanish500));
    }
    setEffortCounterState(1);
  };

  return (
    <div className={styles.success}>
      <div>🥳</div>
      <div>Great!</div>
      <div>Let's go again!</div>

      <RoundButton isFitContent onClickFunc={counterHandler} disabled={false}>
        →
      </RoundButton>
    </div>
  );
};
