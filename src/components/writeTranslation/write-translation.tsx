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
  const dispatch = useAppDispatch();
  const locationInTheApp = useLocation();
  const fullFileName = useAppSelector(selectFullFileName);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setValue(e.target.value.toLowerCase());
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log('submit');
    console.log(targetWord);
    if (value === targetWord) {
      dispatch(removeWord({ id }));
    }
  };

  const handleClick = () => {
    dispatch(picData({ id, targetWord, translating, skyid }));
    dispatch(fetchMDcontent(fullFileName));
  };

  useEffect(() => {
    // (заметка № 14)
    dispatch(
      setFullFileName(
        `${`https://${localStorage.getItem(`UserName`)}.github.io/${localStorage.getItem(`UserRepo`)}/`}${targetWord}%20-%20${translating}.md`
      )
    );
  }, [id]);

  return (
    <div className={styles.searchContainer}>
      <Link
        onClick={handleClick}
        className={styles.cardWordArea}
        to='/gitTreiner/word'
        state={{ backgroundLocation: locationInTheApp }}
      >
        {translating}
      </Link>

      <form onSubmit={handleSubmit}>
        <label className={styles.label}>
          Translation:
          <input
            autoFocus
            className={styles.input}
            type='text'
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
