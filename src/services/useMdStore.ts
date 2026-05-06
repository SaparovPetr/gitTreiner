import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { RequestStatus, TOneWord } from '@utils-types';
import { fetchText } from '../utils/fetchText';

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

const initialTargetObject: TOneWord = {
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

interface IMdStore {
  mdState: IMDstate;
  setTargetObject: (value: TOneWord) => void;
  setFileUrl: (value: string) => void;
  setMdText: (value: string) => void;
  setEmptyMdText: () => void;
}

const useMdStore = create<IMdStore>()(
  devtools(
    (set) => ({
      mdState,

      setTargetObject: (value) => {
        set(
          (state) => ({
            mdState: {
              ...state.mdState,
              targetObject: value
            }
          }),
          false,
          'setTargetObject'
        );
      },

      setFileUrl: (value) => {
        set(
          (state) => ({
            mdState: {
              ...state.mdState,
              fullFileName: value
            }
          }),
          false,
          'setFileUrl'
        );
      },

      setMdText: async (value) => {
        try {
          const text = await fetchText(value);
          set(
            (state) => ({
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
          set(
            (state) => ({
              mdState: {
                ...state.mdState,
                requestStatus: RequestStatus.Failed
              }
            }),
            false,
            'md-state'
          );
        }
      },

      setEmptyMdText: () => {
        set(
          (state) => ({
            mdState: {
              ...state.mdState,
              mdContent: ''
            }
          }),
          false,
          'setEmptyMdState'
        );
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
  setFileUrl: useMdStore((state) => state.setFileUrl),
  setMdText: useMdStore((state) => state.setMdText),
  setEmptyMdText: useMdStore((state) => state.setEmptyMdText)
});
