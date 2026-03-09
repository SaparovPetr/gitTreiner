import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState
} from 'react';

import { SearchResults } from '@components/organisms/SearchResults/SearchResults';
import { selectModalState } from '@slices/modal-slice';

import styles from './SearchTemplate.module.css';
import { useAppSelector } from '../../../services/store';

export const SearchTemplate = () => {
  const showModal = useAppSelector(selectModalState); // РТК
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (inputRef.current && !showModal) {
      inputRef.current.focus();
    }
  }, [showModal]);

  return (
    <div className={styles.searchContainer}>
      <label className={styles.label}>
        Search:
        <input
          ref={inputRef}
          className={styles.input}
          type='text'
          value={value}
          onChange={handleChange}
        />
      </label>
      <SearchResults stringFromInput={value} />
    </div>
  );
};
