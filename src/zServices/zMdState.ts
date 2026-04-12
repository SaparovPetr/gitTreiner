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
  pickedWordObject: TOneWord;
  fullFileName: string;
}

const initialPickedWordObject: TOneWord = {
  targetWord: '',
  translating: '',
  skyid: '',
  id: '',
  audioURL: ''
};

const initialState: IMDstate = {
  mdContent: '',
  requestStatus: RequestStatus.Idle,
  pickedWordObject: initialPickedWordObject,
  fullFileName: ''
};

export const useMdStoreZ = create<any>()(
  devtools(
    (set) => ({
      initialState,

      picDataZ: (value: TOneWord) => {
        set({ pickedWordObject: value }, false, 'md-state');
      },
      resetStoreZ: () => {
        set(
          {
            mdContent: '',
            requestStatus: RequestStatus.Idle,
            pickedWordObject: initialPickedWordObject
          },
          false,
          'md-state'
        );
      },
      setFullFileNameZ: (value: string) => {
        set({ fullFileName: value }, false, 'md-state');
      },
      setMdTextZ: async (value: string) => {
        try {
          const text = await fetchText(value);
          set(
            { mdContent: text, requestStatus: RequestStatus.Success },
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

// переделать на селекторы и экшены
const getStatusZ = useMdStoreZ((state) => state.requestStatus);
const getMDcontentZ = () => useMdStoreZ((state) => state.mdContent);
const selectPickedWordObjectZ = () =>
  useMdStoreZ((state) => state.pickedWordObject);
const selectFullFileNameZ = () => useMdStoreZ((state) => state.fullFileName);

const picDataZ = (value: TOneWord) =>
  useMdStoreZ((state) => state.picDataZ(value));
const setFullFileNameZ = (value: string) =>
  useMdStoreZ((state) => state.setFullFileNameZ(value));

const getFullFileNameZ = useMdStoreZ((state) => state.fullFileName);

const setMdTextZ = (value: string) =>
  useMdStoreZ((state) => state.setMdTextZ(value));

const resetStoreZ = useMdStoreZ((state) => state.resetStoreZ());
