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

const useModal = create<IModalState>()(
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
  showModalState: useModal((state) => state.showModalState)
});

export const useModalActions = () => ({
  setShowModalState: useModal((state) => state.setShowModalState)
});
