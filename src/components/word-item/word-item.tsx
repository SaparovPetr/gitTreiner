import { useEffect } from 'react';

import { Layout } from '@components/modal/layout';
import OptionList from '@components/option-list/option-list';
import { selectCollection } from '@slices/words-slice';
import { audioCallback } from '@utils/audio-callback';
import { TOneWord } from '@utils-types';
import { Link, useLocation } from 'react-router-dom';

import styles from './word-item.module.css';
import { useAppSelector } from '../../services/store';

const WordItem = ({ id, targetWord, translating }: TOneWord) => {
  const locationInTheApp = useLocation();
  const collection = useAppSelector(selectCollection);

  useEffect(() => {
    // (заметка № 14)
    audioCallback(collection);
  }, [id]);

  return (
    <Layout>
      {/* (заметка № 6) */}
      <div className={styles.cardContainer}>
        <Link
          className={styles.cardWordArea}
          to='/gitTreiner/word'
          state={{ backgroundLocation: locationInTheApp }}
        >
          {targetWord}
        </Link>
        {/* (заметка № 7) */}
        <OptionList targetWord={targetWord} translating={translating} id={id} />
      </div>
    </Layout>
  );
};

export default WordItem;
