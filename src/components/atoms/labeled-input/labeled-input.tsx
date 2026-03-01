import { ChangeEvent, ChangeEventHandler, useState } from 'react';

import { setEntryInLocalStorage } from '@utils/localstorage-functionality';
import { TOneInput } from '@utils-types';

import styles from './labeled-input.module.css';

const LabeledInput = (props: TOneInput) => {
  const [value, setValue] = useState(
    localStorage.getItem(`${props.keyInLocalStorage}`) || ''
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setValue(e.target.value);
    setEntryInLocalStorage(`${props.keyInLocalStorage}`, e.target.value);
  };

  return (
    <label className={styles.label}>
      {props.lableContent}
      <input
        className={styles.input}
        type='text'
        value={value}
        onChange={handleChange}
      />
    </label>
  );
};

export default LabeledInput;
