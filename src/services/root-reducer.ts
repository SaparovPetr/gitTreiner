import { combineReducers } from '@reduxjs/toolkit';
import { wordsSlice } from './slices/words-slice';
import { counterSlice } from './slices/counter-slice';

const rootReducer = combineReducers({
  [counterSlice.name]: counterSlice.reducer,
  [wordsSlice.name]: wordsSlice.reducer
});

export default rootReducer;
