import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { currientDate } from '@utils/currientDate';

const devtoolsOptions = {
  name: 'counter-store',
  enabled: process.env.NODE_ENV === 'development'
};

interface ICounterState {
  effortCounterState: number;
  setEffortCounterState: (value: number) => void;
}

const useCounterZ = create<ICounterState>()(
  devtools(
    (set, get) => ({
      effortCounterState: 0,
      setEffortCounterState: (value: number) => {
        const nextValue = get().effortCounterState + value;
        set({ effortCounterState: nextValue }, false, 'counter-state');
        // (заметка № 16)
        localStorage.setItem(
          `effortCounterInStorage-${currientDate}`,
          nextValue.toString()
        );
      }
    }),
    devtoolsOptions
  )
);

export const useCounterActions = () => ({
  setEffortCounterState: useCounterZ((state) => state.setEffortCounterState)
});
