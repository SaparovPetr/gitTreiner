import { combineReducers } from '@reduxjs/toolkit';

import { counterSlice } from './slices/counter-slice';
import { mdSlice } from './slices/md-slice';
import { modalSlice } from './slices/modal-slice';
import { modeSlice } from './slices/mode-slice';
import { wordsSlice } from './slices/words-slice';

const rootReducer = combineReducers({
  [counterSlice.name]: counterSlice.reducer,
  [wordsSlice.name]: wordsSlice.reducer,
  [modalSlice.name]: modalSlice.reducer,
  [modeSlice.name]: modeSlice.reducer,
  [mdSlice.name]: mdSlice.reducer
});

export default rootReducer;
