import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState
} from 'react';

import SearchResults from '@components/search-results/search-results';
import { selectModalState } from '@slices/modal-slice';

import styles from './search.module.css';
import { useAppSelector } from '../../services/store';

const Search = () => {
  const [value, setValue] = useState('');
  const showModal = useAppSelector(selectModalState);
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

export default Search;
