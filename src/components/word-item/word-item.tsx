import styles from './word-item.module.css';
import { Layout } from '../modal/layout';
import { TOneWord } from '@utils-types';
import OptionList from '../option-list/option-list';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../services/store';

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
