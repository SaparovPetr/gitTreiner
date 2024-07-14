import { createSlice } from '@reduxjs/toolkit';
import { currientDate } from '../../utils/currient-date';

interface ICounterState {
  effortCounter: any;
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
  },
  selectors: {
    selectEffortCounter: (sliceState) => sliceState.effortCounter
  }
});

export const { setCounter } = counterSlice.actions;
export const { selectEffortCounter } = counterSlice.selectors;
