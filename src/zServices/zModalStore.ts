import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const devtoolsOptions = {
  name: 'modal-store',
  enabled: process.env.NODE_ENV === 'development'
};

interface ModalState {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

export const useModalZ = create<ModalState>()(
  devtools(
    (set) => ({
      showModal: false,
      setShowModal: (value: boolean) =>
        set({ showModal: value }, false, 'modal')
    }),
    devtoolsOptions
  )
);
