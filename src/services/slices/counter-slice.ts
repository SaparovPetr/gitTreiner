import { createSlice } from '@reduxjs/toolkit';

import { currientDate } from '../../utils/currient-date';

interface ICounterState {
  effortCounter: number;
}

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
