import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOneWord } from '@utils-types';

import { fetchMDcontent } from '../thunks/fetchMDcontent';

interface IMDstate {
  mdContent: string;
  requestStatus: RequestStatus;
  pickedWordObject: TOneWord;
  fullFileName: string;
}

const initialState: IMDstate = {
  mdContent: '',
  requestStatus: RequestStatus.Idle,
  pickedWordObject: {
    targetWord: '',
    translating: '',
    skyid: '',
    id: ''
  },
  fullFileName: ''
};

export const mdSlice = createSlice({
  name: 'md',
  initialState,
  reducers: {
    picData(state, action) {
      state.pickedWordObject = action.payload;
    },
    resetStore(state) {
      state.mdContent = '';
      state.requestStatus = RequestStatus.Idle;
    },
    setFullFileName(state, action) {
      state.fullFileName = action.payload;
    }
  },
  selectors: {
    getStatus: (sliceState) => sliceState.requestStatus,
    getMDcontent: (sliceState) => sliceState.mdContent,
    selectPickedWordObject: (sliceState) => sliceState.pickedWordObject
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMDcontent.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.mdContent = action.payload;
      })
      .addCase(fetchMDcontent.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchMDcontent.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.mdContent =
          'Заметка не получена. Укажите путь к репозиторию в настройках';
      });
  }
});

export const { getStatus, getMDcontent, selectPickedWordObject } =
  mdSlice.selectors;

export const { picData, resetStore } = mdSlice.actions;
