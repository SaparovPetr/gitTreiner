import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { RequestStatus, TOneWord } from '@utils-types';
import { fetchText } from './fetchText';

const devtoolsOptions = {
  name: 'md-store',
  enabled: process.env.NODE_ENV === 'development'
};

interface IMDstate {
  mdContent: string;
  requestStatus: RequestStatus;
  targetObject: TOneWord;
  fullFileName: string;
}

const initialTargetObject: any = {
  targetWord: '',
  translating: '',
  skyid: '',
  id: '',
  audioURL: ''
};

const mdState: IMDstate = {
  mdContent: '',
  requestStatus: RequestStatus.Idle,
  targetObject: initialTargetObject,
  fullFileName: ''
};

const useMdStore = create<any>()(
  devtools(
    (set) => ({
      mdState,
      setTargetObject: (value: TOneWord) => {
        set(
          (state: any) => ({
            mdState: {
              ...state.mdState,
              targetObject: value
            }
          }),
          false,
          'setTargetObject'
        );
      },

      setFullFileName: (value: string) => {
        set(
          (state: any) => ({
            mdState: {
              ...state.mdState,
              fullFileName: value
            }
          }),
          false,
          'setFullFileName'
        );
      },

      setMdText: async (value: string) => {
        try {
          const text = await fetchText(value);
          set(
            (state: any) => ({
              mdState: {
                ...state.mdState,
                mdContent: text,
                requestStatus: RequestStatus.Success
              }
            }),
            false,
            'md-state'
          );
        } catch (err) {
          set({ requestStatus: RequestStatus.Failed }, false, 'md-state');
        }
      }
    }),
    devtoolsOptions
  )
);

// селекторы
export const useMdSelectors = () => ({
  targetObject: useMdStore((state) => state.mdState.targetObject),
  fullFileName: useMdStore((state) => state.mdState.fullFileName),
  mdContent: useMdStore((state) => state.mdState.mdContent),
  requestStatus: useMdStore((state) => state.mdState.requestStatus)
});

//  экшены
export const useMdActions = () => ({
  setTargetObject: useMdStore((state) => state.setTargetObject),
  setFullFileName: useMdStore((state) => state.setFullFileName),
  setMdText: useMdStore((state) => state.setMdText)
});
