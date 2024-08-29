import { createSlice } from '@reduxjs/toolkit';
import { ICounterState } from '@utils-types';

import { currientDate } from '../../utils/currient-date';

const initialState: ICounterState = {
  effortCounter: 0
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setCounter(state, action) {
      state.effortCounter = state.effortCounter + action.payload;
      localStorage.setItem(
        `effortCounterInStorage-${currientDate}`,
        `${state.effortCounter}`
      );
    }
  }
});

export const { setCounter } = counterSlice.actions;
