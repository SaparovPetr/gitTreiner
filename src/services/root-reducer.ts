import { combineReducers } from '@reduxjs/toolkit';
import { wordsSlice } from './slices/words-slice';
import { translationSlice } from './slices/translation-slace';

const rootReducer = combineReducers({
  [wordsSlice.name]: wordsSlice.reducer,
  [translationSlice.name]: translationSlice.reducer
});

export default rootReducer;
