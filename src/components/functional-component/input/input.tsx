import { ChangeEvent, useState } from 'react';

import { setEntryInLocalStorage } from '@//utils/localstorage-functionality';

function Input() {
  // Состояние, в котором содержится значение поля ввода
  const [value, setValue] = useState(localStorage.getItem(`linkToBot`) || '');

  // Обработчик изменения поля ввода обновляет состояние
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    // console.log(e.target.value);
    setEntryInLocalStorage('linkToBot', e.target.value);
  }

  return (
    // Значение элемента «привязывается» к значению состояния
    <input type='text' value={value} onChange={handleChange} />
  );
}

export default Input;
