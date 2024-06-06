import React, { StrictMode, useEffect } from 'react';
import './functional-component.css';
import WordItem from '../word-item/WordItem';
import { selectWords } from '../../services/slices/wordsSlice';
import { useAppSelector, useAppDispatch } from '../../services/store';
import {
  fetchWords,
  clearList,
  addIdToEachWord
} from '../../services/thunks/thunk';

const FunctionalComponent = () => {
  const dispatch = useAppDispatch();
  const words = useAppSelector(selectWords);

  const resetList = () => {
    dispatch(clearList());
    dispatch(fetchWords());
    dispatch(addIdToEachWord(words));
  };

  if (words.length > 0) {
    return (
      <main className='functional-area'>
        <div className='buttons-wrapper'>
          <div className='words-counter-wrapper'>
            <div className='words-counter'>{words.length}</div>
          </div>
          <button className='refresh-button' onClick={resetList}>
            ↺
          </button>
        </div>
        {<WordItem key={words[0].id} {...words[0]} />}
      </main>
    );
  }

  if (words.length === 0) {
    return (
      <main className='functional-area'>
        {/* <div className='buttons-wrapper'>
          <div className='words-counter-wrapper'>
            <div className='words-counter'>{words.length}</div>
          </div>
          <button className='refresh-button' onClick={resetList}>
            ↺
          </button>
        </div> */}
        <div className='success'>
          <div>🤘</div>
          <div>Let's try again?</div>
          <button className='refresh-button' onClick={resetList}>
            ↺
          </button>
        </div>
      </main>
    );
  }
};

export default FunctionalComponent;
