import { ChangeEvent, ChangeEventHandler, useState } from 'react';

import { setEntryInLocalStorage } from '@//utils/localstorage-functionality';
import { TOneInput } from '@//utils/types';

const Input = (props: TOneInput) => {
  const [value, setValue] = useState(
    localStorage.getItem(`${props.keyInLocalStorage}`) || ''
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setValue(e.target.value);
    setEntryInLocalStorage(`${props.keyInLocalStorage}`, e.target.value);
  };

  return <input type='text' value={value} onChange={handleChange} />;
};

export default Input;
