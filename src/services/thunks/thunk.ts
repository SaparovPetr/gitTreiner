import { createAsyncThunk } from '@reduxjs/toolkit';
import { removeWord } from '../slices/wordsSlice';
import { getRandomElement } from '../../utils/getRandomElemtnt';
import { myBase } from '../../wordBase';
import { TOneWord } from '@utils-types';

export const fetchWords = createAsyncThunk(
  'words/fetchWords',
  async function () {
    const data = [];
    for (let i = 0; i <= 29; i = i + 1) {
      const randomElement = getRandomElement(myBase);
      data.push(randomElement);
    }
    return data;
  }
);

export const addIdToEachWord = createAsyncThunk(
  'words/addIdToEachWord',
  async function (arr: TOneWord[]) {
    return arr;
  }
);

export const clearList = createAsyncThunk('words/clearList', async () => null);

export const deleteWord = createAsyncThunk(
  'words/deleteWord',
  async function (id: string, { dispatch }) {
    dispatch(removeWord({ id }));
  }
);
