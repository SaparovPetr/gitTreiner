import { ChangeEvent, ChangeEventHandler, useState } from 'react';

import SearchResults from '@components/search-results/search-results';

import styles from './search.module.css';

const Search = () => {
  const [value, setValue] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <label className={styles.label}>
        Search:
        <input
          autoFocus
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
