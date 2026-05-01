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

const useModalZ = create<IModalState>()(
  devtools(
    (set) => ({
      showModalState: false,
      setShowModalState: (value: boolean) =>
        set({ showModalState: value }, false, 'modal-state')
    }),
    devtoolsOptions
  )
);

export const useModalSelectors = () => {
  const showModalState = useModalZ((state) => state.showModalState);
  return { showModalState };
};

export const useModalActions = () => {
  const setShowModalState = useModalZ((state) => state.setShowModalState);
  return { setShowModalState };
};
