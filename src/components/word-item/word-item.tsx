import React, { StrictMode } from 'react';
import styles from './word-item.module.css';

import { Layout } from '../modal/layout';
// import {
//   switchLanguageState,
//   selectCurrientLanguage
// } from '../../services/slices/translation-slace';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { TOneWord } from '@utils-types';

import OptionList from '../option-list/option-list';
import { Link, useLocation } from 'react-router-dom';

const WordItem = ({ id, targetWord, translating }: TOneWord) => {
  // const dispatch = useAppDispatch();
  // const currientLanguage = useAppSelector(selectCurrientLanguage);

  // const switchLanguage = () => {
  //   if (currientLanguage === 'inEnglish') {
  //     dispatch(switchLanguageState('inRussian'));
  //   } else {
  //     dispatch(switchLanguageState('inEnglish'));
  //   }
  // };

  const locationInTheApp = useLocation();

  return (
    <Layout>
      <div className={styles.cardContainer}>
        <div className={styles.cardWordAreaWrapper}>
          {/* <div className={styles.cardWordArea} onClick={() => switchLanguage()}>
            {currientLanguage === 'inEnglish' ? targetWord : translating}
          </div> */}
          <div
            className={styles.cardWordArea}
            // onClick={() => switchLanguage()}
          >
            <Link
              className={styles.button}
              to={'/gitTreiner/word'}
              state={{ backgroundLocation: locationInTheApp }}
            >
              {targetWord}
            </Link>
          </div>
        </div>
        <OptionList targetWord={targetWord} translating={translating} id={id} />
      </div>
    </Layout>
  );
};

export default WordItem;
