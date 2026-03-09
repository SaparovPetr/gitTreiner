import { ChangeEvent, ChangeEventHandler, useState } from 'react';

import { setEntryInLocalStorage } from '@utils/localStorageFunctionality';

import styles from './LabeledInput.module.css';

type TOneInputProps = {
  keyInLocalStorage: string;
  lableContent: string;
};

const LabeledInput = ({ keyInLocalStorage, lableContent }: TOneInputProps) => {
  const [value, setValue] = useState(
    localStorage.getItem(`${keyInLocalStorage}`) || ''
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setValue(e.target.value);
    setEntryInLocalStorage(`${keyInLocalStorage}`, e.target.value);
  };

  return (
    <label className={styles.label}>
      {lableContent}
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
