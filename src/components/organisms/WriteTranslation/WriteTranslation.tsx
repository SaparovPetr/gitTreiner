import {
  ChangeEvent,
  ChangeEventHandler,
  SyntheticEvent,
  useState
} from 'react';

import { RoundButton } from '@components/atoms/RoundButton/RoundButton';
import { TOneWord } from '@utils-types';
import { Link, useLocation } from 'react-router-dom';

import styles from './WriteTranslation.module.css';

import { useCollectionActions } from '@zStore/zCollectionState';
import { useMdActions, useMdSelectors } from '@zStore/zMdState';

export const WriteTranslation = ({
  id,
  targetWord,
  translating,
  skyid
}: TOneWord) => {
  const [value, setValue] = useState('');
  const [wrongAnswer, setWrongAnswer] = useState(false);

  const locationInTheApp = useLocation();
  const { setTrimmedCollectionState } = useCollectionActions();
  const { setTargetObject, setFullFileName, setMdText } = useMdActions();
  const { fullFileName } = useMdSelectors();
  const handleChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setValue(e.target.value);
    setWrongAnswer(false);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (value === targetWord) {
      setTrimmedCollectionState(id);
    } else {
      setWrongAnswer(true);
    }
  };

  const handleClick = () => {
    setFullFileName(
      `${`https://${localStorage.getItem(`UserName`)}.github.io/${localStorage.getItem(`UserRepo`)}/`}${targetWord}%20-%20${translating}.md`
    ); // TODO нужно ли оно мне или лучше в онклике устанавливать путь?
    setTargetObject({ id, targetWord, translating, skyid });
    setMdText(fullFileName);
  };

  return (
    <div className={styles.entryCardContainer}>
      <Link
        onClick={handleClick}
        className={styles.translationWord}
        to='/word'
        state={{ backgroundLocation: locationInTheApp }}
      >
        {translating}
      </Link>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          write translation:
          <input
            autoFocus
            type='text'
            className={wrongAnswer ? styles.inputWithWrongAnswer : styles.input}
            value={value}
            onChange={handleChange}
          />
        </label>
        <RoundButton isFitContent htmlType='submit'>
          Check
        </RoundButton>
      </form>
    </div>
  );
};
