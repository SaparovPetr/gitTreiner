import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '@utils-types';

import { fetchMDcontent } from '../thunks/fetchMDcontent';

interface IMDState {
  mdContent: string;
  requestStatus: RequestStatus;
}

const initialState: IMDState = {
  mdContent: '',
  requestStatus: RequestStatus.Idle
};

export const mdSlice = createSlice({
  name: 'md',
  initialState,
  reducers: {
    resetStore(state) {
      state.mdContent = '';
      state.requestStatus = RequestStatus.Idle;
    }
  },
  selectors: {
    getStatus: (sliceState) => sliceState.requestStatus,
    getMDcontent: (sliceState) => sliceState.mdContent
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

export const { getStatus, getMDcontent } = mdSlice.selectors;

export const { resetStore } = mdSlice.actions;
