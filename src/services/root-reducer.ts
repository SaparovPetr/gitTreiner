import { combineReducers } from '@reduxjs/toolkit';

import { mdSlice } from './slices/md-slice';

const rootReducer = combineReducers({
  [mdSlice.name]: mdSlice.reducer
});

export default rootReducer;
