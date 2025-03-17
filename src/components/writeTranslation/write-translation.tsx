import {
  ChangeEvent,
  ChangeEventHandler,
  SyntheticEvent,
  useEffect,
  useState
} from 'react';

import { RoundButton } from '@components/round-button/round-button';
import { picData, selectFullFileName, setFullFileName } from '@slices/md-slice';
import { removeWord } from '@slices/words-slice';
import { TOneWord } from '@utils-types';
import { Link, useLocation } from 'react-router-dom';

import styles from './write-translation.module.css';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchMDcontent } from '../../services/thunks/fetchMDcontent';

const WriteTranslation = ({ id, targetWord, translating, skyid }: TOneWord) => {
  const [value, setValue] = useState('');
  const [wrongAnswer, setWrongAnswer] = useState(false);

  const dispatch = useAppDispatch();
  const locationInTheApp = useLocation();
  const fullFileName = useAppSelector(selectFullFileName);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setValue(e.target.value);
    setWrongAnswer(false);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (value === targetWord) {
      dispatch(removeWord({ id }));
    } else {
      setWrongAnswer(true);
    }
  };

  const handleClick = () => {
    dispatch(picData({ id, targetWord, translating, skyid }));
    dispatch(fetchMDcontent(fullFileName));
  };

  useEffect(() => {
    dispatch(
      setFullFileName(
        `${`https://${localStorage.getItem(`UserName`)}.github.io/${localStorage.getItem(`UserRepo`)}/`}${targetWord}%20-%20${translating}.md`
      )
    );
  }, [id]);

  return (
    <div className={styles.cardContainer}>
      <Link
        onClick={handleClick}
        className={styles.translationWord}
        to='/gitTreiner/word'
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
        <RoundButton htmlType='submit'>Check</RoundButton>
      </form>
    </div>
  );
};

export default WriteTranslation;
