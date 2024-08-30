import { createSlice } from '@reduxjs/toolkit';
import { TOneWord } from '@utils-types';

import { fetchCollection, clearList, addIdToEachWord } from '../thunks/thunk'; //11

const uuid = require('uuid');

interface arrayState {
  words: TOneWord[];
}

const initialState: arrayState = {
  words: []
};

export const wordsSlice = createSlice({
  name: 'words-slice',
  initialState,
  reducers: {
    removeWord(state, action) {
      state.words = state.words.filter((word) => word.id !== action.payload.id);
    }
  },

  selectors: {
    /**селлектор коллекции (короткого массива), сформированная из базы слов */
    selectWords: (sliceState) => sliceState.words,
    /**первый объект из коллекции (короткого массива)  */
    selectFirstWord: (sliceState) => sliceState.words[0]
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCollection.fulfilled, (state, action) => {
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
