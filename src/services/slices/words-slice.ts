import { createSlice } from '@reduxjs/toolkit';
import { fetchCollection } from '@utils/get-random-element';
import { TOneWord } from '@utils-types';

const uuid = require('uuid');

interface arrayState {
  collection: TOneWord[];
}

const initialState: arrayState = {
  collection: []
};

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    // (заметка № 4)
    makeCollection(state, action) {
      const collection = fetchCollection(action.payload);
      // (заметка № 5)
      collection.map((element) => {
        element.id = uuid.v4();
      });
      state.collection = collection;
    },
    removeWord(state, action) {
      state.collection = state.collection.filter(
        (word) => word.id !== action.payload.id
      );
    }
  },

  selectors: {
    /** селлектор Коллекции */
    selectCollection: (sliceState) => sliceState.collection,
    /** Рабочий элемент Коллекции  */
    selectFirstWord: (sliceState) => sliceState.collection[0]
  }
});

export const { makeCollection, removeWord } = wordsSlice.actions;
export const { selectCollection, selectFirstWord } = wordsSlice.selectors;
