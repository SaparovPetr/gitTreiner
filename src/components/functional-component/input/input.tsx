import { ChangeEvent, ChangeEventHandler, useState } from 'react';

import { setEntryInLocalStorage } from '@//utils/localstorage-functionality';

function Input() {
  const [value, setValue] = useState(localStorage.getItem(`linkToBot`) || '');

  const handleChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setValue(e.target.value);
    setEntryInLocalStorage('linkToBot', e.target.value);
  };

  return <input type='text' value={value} onChange={handleChange} />;
}

export default Input;
