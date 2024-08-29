import { TOneWord } from '@utils-types';
import { Link, useLocation } from 'react-router-dom';

import styles from './word-item.module.css';
import { useAppDispatch } from '../../services/store';
import { Layout } from '../modal/layout';
import OptionList from '../option-list/option-list';

const WordItem = ({ id, targetWord, translating }: TOneWord) => {
  const locationInTheApp = useLocation();

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
