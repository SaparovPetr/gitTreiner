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
      const collectionWithIds = collection.map((element) => ({
        ...element,
        id: uuid.v4()
      }));
      state.collection = collectionWithIds;
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
    selectFirstWord: (sliceState) => sliceState.collection[0],
    selectFullFileName: (sliceState) =>
      `${`https://${localStorage.getItem(`UserName`)}.github.io/${localStorage.getItem(`UserRepo`)}/`}${sliceState.collection[0]?.targetWord}%20-%20${sliceState.collection[0]?.translating}.md`
  }
});

export const { makeCollection, removeWord } = wordsSlice.actions;
export const { selectCollection, selectFirstWord, selectFullFileName } =
  wordsSlice.selectors;
