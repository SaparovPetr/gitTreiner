import { combineReducers } from '@reduxjs/toolkit';
import { wordsSlice } from './slices/words-slice';
import { counterSlice } from './slices/counter-slice';
import { modalSlice } from './slices/modal-slice';

const rootReducer = combineReducers({
  [counterSlice.name]: counterSlice.reducer,
  [wordsSlice.name]: wordsSlice.reducer,
  [modalSlice.name]: modalSlice.reducer
});

export default rootReducer;
