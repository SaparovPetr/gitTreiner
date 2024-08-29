import { useEffect } from 'react';

import { TOneWord } from '@utils-types';
import { Link, useLocation } from 'react-router-dom';

import styles from './word-item.module.css';
import { selectWords } from '../../services/slices/words-slice';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { audioCallback } from '../../utils/audioCallback';
import { Layout } from '../modal/layout';
import OptionList from '../option-list/option-list';

const WordItem = ({ id, targetWord, translating }: TOneWord) => {
  const locationInTheApp = useLocation();

  const words = useAppSelector(selectWords);

  useEffect(() => {
    audioCallback(words);
  });

  return (
    <Layout>
      <div className={styles.cardContainer}>
        <Link
          className={styles.cardWordArea}
          to={'/gitTreiner/word'}
          state={{ backgroundLocation: locationInTheApp }}
        >
          {targetWord}
        </Link>
        <OptionList targetWord={targetWord} translating={translating} id={id} />
      </div>
    </Layout>
  );
};

export default WordItem;
