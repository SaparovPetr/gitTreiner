import { combineReducers } from '@reduxjs/toolkit';
import { wordsSlice } from './slices/wordsSlice';
import { translationSlice } from './slices/translationSlace';

const rootReducer = combineReducers({
  [wordsSlice.name]: wordsSlice.reducer,
  [translationSlice.name]: translationSlice.reducer
});

export default rootReducer;
