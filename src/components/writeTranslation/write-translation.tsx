import {
  ChangeEvent,
  ChangeEventHandler,
  SyntheticEvent,
  useState
} from 'react';

import { RoundButton } from '@components/round-button/round-button';
import { removeWord } from '@slices/words-slice';
import { TOneWord } from '@utils-types';

import styles from './write-translation.module.css';
import { useAppDispatch } from '../../services/store';

const WriteTranslation = ({ id, targetWord, translating, skyid }: TOneWord) => {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

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

  return (
    <div className={styles.searchContainer}>
      <div>{translating}</div>
      <div>{targetWord}</div>

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
        <RoundButton htmlType='submit' disabled={false}>
          Check
        </RoundButton>
      </form>
    </div>
  );
};

export default WriteTranslation;
