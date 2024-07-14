import { combineReducers } from '@reduxjs/toolkit';
import { wordsSlice } from './slices/words-slice';
import { translationSlice } from './slices/translation-slace';
import { counterSlice } from './slices/counter-slice';

const rootReducer = combineReducers({
  [counterSlice.name]: counterSlice.reducer,
  [wordsSlice.name]: wordsSlice.reducer,
  [translationSlice.name]: translationSlice.reducer
});

export default rootReducer;
