import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState
} from 'react';

import { SearchResults } from '@components/organisms/SearchResults/SearchResults';

import styles from './SearchTemplate.module.css';
import { useModalZ } from '../../../zServices/zModalStore';

export const SearchTemplate = () => {
  const modalState = useModalZ((state) => state.showModalState);

  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (inputRef.current && !modalState) {
      inputRef.current.focus();
    }
  }, [modalState]);

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
