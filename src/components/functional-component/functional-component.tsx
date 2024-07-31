import clsx from 'clsx';
import { memo } from 'react';
import WordItem from '../word-item/word-item';
import { selectWords } from '../../services/slices/words-slice';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { clearList, addIdToEachWord } from '../../services/thunks/thunk';
import styles from './functional-component.module.css';
import { setCounter } from '../../services/slices/counter-slice';
import { currientDate } from '../../utils/currient-date';
import { selectModeState, setMode } from '../../services/slices/mode-slice';
import { AppMode } from '@utils-types';

const FunctionalComponent = memo(() => {
  const dispatch = useAppDispatch();
  const words = useAppSelector(selectWords);
  const currientMode = useAppSelector(selectModeState);

  const resetListAndIncreaseCounter = () => {
    dispatch(clearList());
    dispatch(addIdToEachWord(words));
    dispatch(setCounter(1));
    location.reload();
  };

  const audioCallback = () => {
    const audioObj = new Audio(
      `https://vimbox-tts.skyeng.ru/api/v1/tts?text=${words[0].targetWord}&lang=en&voice=male_2`
    );
    audioObj.play();
  };

  const currientModeFromLocalStorage = localStorage.getItem(`currientMode`);

  const counterFromLocalStorage = localStorage.getItem(
    `effortCounterInStorage-${currientDate}`
  );

  const changeMode = () => {
    if (currientMode === AppMode.Large) {
      dispatch(setMode(AppMode.Small));
      location.reload();
    }
    if (currientMode === AppMode.Small) {
      dispatch(setMode(AppMode.Large));
      location.reload();
    }
  };

  if (words.length > 0) {
    return (
      <div className={styles.functionalArea}>
        <div className={styles.headerArea}>
          <div className={styles.logoArea}>
            <div>Git_ </div>
            <div>treiner</div>
            <div onClick={changeMode} className={styles.button}>
              {currientModeFromLocalStorage}
            </div>
          </div>

          <div className={styles.buttonsWrapper}>
            <div className={styles.button}> remain: {words.length}</div>

            <div className={styles.button}>
              today: {counterFromLocalStorage ? counterFromLocalStorage : 0}
            </div>

            <div
              className={clsx(styles.button, styles.button_audioButton)}
              onClick={audioCallback}
            >
              &#9835;
            </div>
          </div>
        </div>

        <WordItem key={words[0].id} {...words[0]} />
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <div className={styles.functionalArea}>
        <div className={styles.success}>
          <div>🤘</div>
          <div>Go to English!</div>
          <button
            className={styles.button}
            onClick={resetListAndIncreaseCounter}
          >
            →
          </button>
        </div>
      </div>
    );
  }
});

export default FunctionalComponent;
