import {
  ChangeEvent,
  ChangeEventHandler,
  SyntheticEvent,
  useEffect,
  useState
} from 'react';

import { RoundButton } from '@components/atoms/RoundButton/RoundButton';
import { picData, selectFullFileName, setFullFileName } from '@slices/md-slice';
import { TOneWord } from '@utils-types';
import { Link, useLocation } from 'react-router-dom';

import styles from './WriteTranslation.module.css';
import { useAppDispatch, useAppSelector } from '../../../services/store';
import { fetchMDcontent } from '../../../services/thunks/fetchMDcontent';
import { useCollectionActions } from '@zStore/zCollectionState';
import { useMdActions_z, useMdSelectors_z } from '@zStore/zMdState_z';

export const WriteTranslation = ({
  id,
  targetWord,
  translating,
  skyid
}: TOneWord) => {
  const [value, setValue] = useState('');
  const [wrongAnswer, setWrongAnswer] = useState(false);

  const dispatch = useAppDispatch(); // РТК
  const locationInTheApp = useLocation();
  const fullFileName = useAppSelector(selectFullFileName); // РТК
  const { setTrimmedCollectionState } = useCollectionActions();
  const { setTargetObject_z, setFullFileName_z, setMdText_z } =
    useMdActions_z();
  const { fullFileName_z, targetObject_z, mdContent_z, requestStatus_z } =
    useMdSelectors_z();
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
    dispatch(picData({ id, targetWord, translating, skyid }));
    dispatch(fetchMDcontent(fullFileName));
    dispatch(
      setFullFileName(
        `${`https://${localStorage.getItem(`UserName`)}.github.io/${localStorage.getItem(`UserRepo`)}/`}${targetWord}%20-%20${translating}.md`
      )
    );

    setFullFileName_z(
      `${`https://${localStorage.getItem(`UserName`)}.github.io/${localStorage.getItem(`UserRepo`)}/`}${targetWord}%20-%20${translating}.md`
    ); // TODO нужно ли оно мне или лучше в онклике устанавливать путь?
    setTargetObject_z({ id, targetWord, translating, skyid });
    setMdText_z(fullFileName_z);
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
