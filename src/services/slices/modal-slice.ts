import { createSlice } from '@reduxjs/toolkit';

interface IModalState {
  showModal: boolean;
}

const initialState: IModalState = {
  showModal: false
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    /** установка булевого состояния модалки */
    setShowModal(state, action) {
      state.showModal = action.payload;
    }
  },
  selectors: {
    selectModalState: (sliceState) => sliceState.showModal
  }
});

export const { setShowModal } = modalSlice.actions;
export const { selectModalState } = modalSlice.selectors;
