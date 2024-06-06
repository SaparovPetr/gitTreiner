import React, { StrictMode } from 'react';
import './word-item.css';
import { Layout } from '../modal/layout';
import { deleteWord } from '../../services/thunks/thunk';
import {
  switchLanguageState,
  selectCurrientLanguage
} from '../../services/slices/translationSlace';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { Link, useLocation } from 'react-router-dom';
import { TOneWord } from '@utils-types';

const WordItem = ({ id, targetWord, translating }: TOneWord) => {
  const dispatch = useAppDispatch();
  const currientLanguage = useAppSelector(selectCurrientLanguage);
  const location = useLocation();

  const switchLanguage = () => {
    if (currientLanguage === 'inEnglish') {
      dispatch(switchLanguageState('inRussian'));
    } else {
      dispatch(switchLanguageState('inEnglish'));
    }
  };

  return (
    <Layout>
      <div className='item-container'>
        <div className='word-area' onClick={() => switchLanguage()}>
          {currientLanguage === 'inEnglish' ? targetWord : translating}
        </div>
        <div className='item-bottom-area'>
          <Link
            className='modal-button'
            to={'/gitTreiner/word/'}
            state={{ backgroundLocation: location }}
          >
            &uarr;
          </Link>

          <button
            className='skip-button'
            onClick={() => {
              dispatch(deleteWord(id));
              dispatch(switchLanguageState('inEnglish'));
            }}
          >
            &rarr;
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default WordItem;
