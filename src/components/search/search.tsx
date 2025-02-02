import { ChangeEvent, ChangeEventHandler, useState } from 'react';

import SearchResults from '@components/search-results/search-results';

import styles from './search.module.css';

const Search = () => {
  const [value, setValue] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setValue(e.target.value);
    console.log(value);
  };

  return (
    <>
      <SearchResults targetWord={value} />

      <label className={styles.label}>
        Search:
        <input
          className={styles.input}
          type='text'
          value={value}
          onChange={handleChange}
        />
      </label>
    </>
  );
};

export default Search;
