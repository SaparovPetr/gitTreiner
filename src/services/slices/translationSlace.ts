import { createSlice } from '@reduxjs/toolkit';

interface ILanguageState {
  currientLanguage: 'inEnglish' | 'inRussian';
}

const initialState: ILanguageState = {
  currientLanguage: 'inEnglish'
};

export const translationSlice = createSlice({
  name: 'translation',
  initialState,
  reducers: {
    switchLanguageState(state, action) {
      state.currientLanguage = action.payload;
    }
  },
  selectors: {
    selectCurrientLanguage: (sliceState) => sliceState.currientLanguage
  }
});

export const { switchLanguageState } = translationSlice.actions;
export const { selectCurrientLanguage } = translationSlice.selectors;
