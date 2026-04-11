import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const devtoolsOptions = {
  name: 'modal-store',
  enabled: process.env.NODE_ENV === 'development'
};

interface IModalState {
  showModalState: boolean;
  setShowModalState: (value: boolean) => void;
}

export const useModalZ = create<IModalState>()(
  devtools(
    (set) => ({
      showModalState: false,
      setShowModalState: (value: boolean) =>
        set({ showModalState: value }, false, 'modal-state')
    }),
    devtoolsOptions
  )
);
