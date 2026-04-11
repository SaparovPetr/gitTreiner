import { combineReducers } from '@reduxjs/toolkit';

import { mdSlice } from './slices/md-slice';
import { wordsSlice } from './slices/words-slice';

const rootReducer = combineReducers({
  [wordsSlice.name]: wordsSlice.reducer,
  [mdSlice.name]: mdSlice.reducer
});

export default rootReducer;
