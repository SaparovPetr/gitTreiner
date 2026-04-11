import { combineReducers } from '@reduxjs/toolkit';

import { mdSlice } from './slices/md-slice';
import { modeSlice } from './slices/mode-slice';
import { wordsSlice } from './slices/words-slice';

const rootReducer = combineReducers({
  [wordsSlice.name]: wordsSlice.reducer,
  [modeSlice.name]: modeSlice.reducer,
  [mdSlice.name]: mdSlice.reducer
});

export default rootReducer;
