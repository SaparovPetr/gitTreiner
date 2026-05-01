import { FC } from 'react';

import { RoundButton } from '@components/atoms/RoundButton/RoundButton';
import { AppMode } from '@utils-types';
import { threeThousandWordBase } from '@word-bases/3k';
import { aWordBase } from '@word-bases/a';
import { bOneWordBase } from '@word-bases/b-one';
import { bTwoWordBase } from '@word-bases/b-two';
import { difWordBase } from '@word-bases/dif';
import { spanish400 } from '@word-bases/spanish400';
import { spanish500 } from '@word-bases/spanish500';

import styles from './SuccessTemplate.module.css';
import { useModeSelectors } from '@zStore/zModeStore';
import { useCollectionZ } from '@zStore/zCollectionState';
import { useCounterActions } from '@zStore/zCounterStore';

export const SuccessTemplate: FC = () => {
  const { setEffortCounterState } = useCounterActions();
  const { modeState } = useModeSelectors();
  const setCollectionState = useCollectionZ(
    (state) => state.setCollectionState
  );

  const counterHandler = () => {
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
    if (modeState === AppMode.Es400) {
      setCollectionState(spanish400);
    }
    if (modeState === AppMode.Es500) {
      setCollectionState(spanish500);
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
