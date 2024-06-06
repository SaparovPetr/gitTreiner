import { createSlice } from '@reduxjs/toolkit';
import { fetchWords, clearList, addIdToEachWord } from '../thunks/thunk'; //11
import { TOneWord } from '@utils-types';
const uuid = require('uuid');

interface arrayState {
  words: TOneWord[];
}

const initialState: arrayState = {
  words: []
};

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    removeWord(state, action) {
      state.words = state.words.filter((word) => word.id !== action.payload.id);
    }
  },

  selectors: {
    selectWords: (sliceState) => sliceState.words,
    selectFirstWord: (sliceState) => sliceState.words[0]
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.words = action.payload;
      })
      .addCase(clearList.fulfilled, () => initialState)

      .addCase(addIdToEachWord.fulfilled, (state) => {
        state.words.forEach((element) => {
          element.id = uuid.v4();
        });
      });
  }
});

export const { removeWord } = wordsSlice.actions;
export const { selectWords, selectFirstWord } = wordsSlice.selectors;
