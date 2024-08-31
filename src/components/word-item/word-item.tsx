import { useEffect } from 'react';

import { TOneWord } from '@utils-types';
import { Link, useLocation } from 'react-router-dom';

import styles from './word-item.module.css';
import { selectCollection } from '../../services/slices/words-slice';
import { useAppSelector } from '../../services/store';
import { audioCallback } from '../../utils/audio-callback';
import { Layout } from '../modal/layout';
import OptionList from '../option-list/option-list';

const WordItem = ({ id, targetWord, translating }: TOneWord) => {
  const locationInTheApp = useLocation();
  const collection = useAppSelector(selectCollection);

  useEffect(() => {
    audioCallback(collection);
  }, [id]);

  return (
    <Layout>
      <div className={styles.cardContainer}>
        <Link
          className={styles.cardWordArea}
          to={`/${id}`}
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
