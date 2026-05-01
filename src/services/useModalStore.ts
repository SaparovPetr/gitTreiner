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

const useModalStore = create<IModalState>()(
  devtools(
    (set) => ({
      showModalState: false,
      setShowModalState: (value: boolean) =>
        set({ showModalState: value }, false, 'modal-state')
    }),
    devtoolsOptions
  )
);

export const useModalSelectors = () => ({
  showModalState: useModalStore((state) => state.showModalState)
});

export const useModalActions = () => ({
  setShowModalState: useModalStore((state) => state.setShowModalState)
});
