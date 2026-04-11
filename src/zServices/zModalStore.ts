import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const devtoolsOptions = {
  name: 'modal-store',
  enabled: process.env.NODE_ENV === 'development'
};

interface ModalState {
  showModalState: boolean;
  setShowModalState: (value: boolean) => void;
}

export const useModalZ = create<ModalState>()(
  devtools(
    (set) => ({
      showModalState: false,
      setShowModalState: (value: boolean) =>
        set({ showModalState: value }, false, 'modal-state')
    }),
    devtoolsOptions
  )
);
