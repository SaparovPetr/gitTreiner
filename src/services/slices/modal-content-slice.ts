import { createSlice } from '@reduxjs/toolkit';
import { TOneWord } from '@utils-types';

interface IModalContent {
  pickedWordObject: TOneWord;
}

const initialState: IModalContent = {
  pickedWordObject: {
    targetWord: '',
    translating: '',
    skyid: '',
    id: ''
  }
};

export const modalContentSlice = createSlice({
  name: 'modalContent',
  initialState,

  reducers: {
    picData(state, action) {
      state.pickedWordObject = action.payload;
    }
  },
  selectors: {
    selectPickedWordObject: (sliceState) => sliceState.pickedWordObject
  }
});

export const { picData } = modalContentSlice.actions;
export const { selectPickedWordObject } = modalContentSlice.selectors;
