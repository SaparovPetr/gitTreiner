import WordItem from '@components/word-item/word-item';
import { setCounter } from '@slices/counter-slice';
import { selectModeState, setMode } from '@slices/mode-slice';
import { makeCollection, selectCollection } from '@slices/words-slice';
import { AppMode } from '@utils-types';
import { aWordBase } from '@word-bases/a';
import { bOneWordBase } from '@word-bases/b-one';
import { bTwoWordBase } from '@word-bases/b-two';
import { difWordBase } from '@word-bases/dif';
import { Link, useLocation } from 'react-router-dom';

import styles from './functional-component.module.css';
import { useAppSelector, useAppDispatch } from '../../services/store';
import {
  isFirstStart,
  markTheFirstStart
} from '../../utils/localstorage-functionality';
import { threeThousandWordBase } from '../../word-bases/3k';
import WelcomeComponent from '../welcome-component/WelcomeComponent';
import SuccessComponent from '@//success-component/success-component';

const FunctionalComponent = () => {
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
      <>
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
            <span className={styles.text}>▽</span>
          </Link>
        </div>
        <WordItem key={collection[0].id} {...collection[0]} />
      </>
    );
  }

  if (!isFirstStart) {
    return <WelcomeComponent />;
  }

  // (заметка № 13)
  if (collection.length === 0 && isFirstStart) {
    return <SuccessComponent />;
  }
};

export default FunctionalComponent;
