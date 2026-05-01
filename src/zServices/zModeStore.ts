import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AppMode } from '@utils-types';

const devtoolsOptions = {
  name: 'mode-store',
  enabled: process.env.NODE_ENV === 'development'
};

interface IModeState {
  modeState: AppMode;
  setModeState: (value: any) => void;
}

const useModeZ = create<IModeState>()(
  devtools(
    (set, get) => ({
      modeState: AppMode.Dif,

      setModeState: (value: any) => {
        set({ modeState: value }, false, 'mode-state');
        // (заметка № 16)
        localStorage.setItem(`currientMode`, get().modeState);
      }
    }),
    devtoolsOptions
  )
);

export const useModeSelectors = () => ({
  modeState: useModeZ((state) => state.modeState)
});

export const useModeActions = () => ({
  setModeState: useModeZ((state) => state.setModeState)
});
