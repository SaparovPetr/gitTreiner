import { useEffect } from 'react';

import { Layout } from '@components/modal/layout';
import OptionList from '@components/option-list/option-list';
import { picData } from '@slices/modal-content-slice';
import { selectFullFileName } from '@slices/words-slice';
import { audioCallback } from '@utils/audio-callback';
import { TOneWord } from '@utils-types';
import { Link, useLocation } from 'react-router-dom';

import styles from './word-item.module.css';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchMDcontent } from '../../services/thunks/fetchMDcontent';

const WordItem = ({ id, targetWord, translating, skyid }: TOneWord) => {
  const locationInTheApp = useLocation();
  const dispatch = useAppDispatch();
  const fullFileName = useAppSelector(selectFullFileName);

  useEffect(() => {
    // (заметка № 14)
    audioCallback(targetWord);
  }, [id]);

  const handleClick = () => {
    dispatch(picData({ id, targetWord, translating, skyid }));
    dispatch(fetchMDcontent(fullFileName));
  };

  return (
    <Layout>
      {/* (заметка № 6) */}
      <div className={styles.cardContainer}>
        <Link
          onClick={handleClick}
          className={styles.cardWordArea}
          to='/gitTreiner/word'
          state={{ backgroundLocation: locationInTheApp }}
        >
          {targetWord}
        </Link>
        {/* (заметка № 7) */}
        <OptionList
          targetWord={targetWord}
          translating={translating}
          id={id}
          skyid={skyid}
        />
      </div>
    </Layout>
  );
};

export default WordItem;
