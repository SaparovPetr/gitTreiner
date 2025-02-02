import { ChangeEvent, ChangeEventHandler, useState } from 'react';

import styles from './search.module.css';

const SearchResults = ({ targetWord }: any) => (
  //   const [value, setValue] = useState('');

  //   const handleChange: ChangeEventHandler<HTMLInputElement> = (
  //     e: ChangeEvent<HTMLInputElement>
  //   ) => {
  //     setValue(e.target.value);
  //     console.log(value);
  //   };

  <>
    <div>{targetWord}</div>
  </>
);
export default SearchResults;
