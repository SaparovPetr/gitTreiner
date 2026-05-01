import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { RequestStatus, TOneWord } from '@utils-types';
import { fetchText } from './fetchText';

const devtoolsOptions = {
  name: 'md-store',
  enabled: process.env.NODE_ENV === 'development'
};

interface IMDstate_z {
  mdContent_z: string;
  requestStatus_z: RequestStatus;
  targetObject_z: TOneWord;
  fullFileName_z: string;
}

const initialTargetObject_z: any = {
  targetWord: '',
  translating: '',
  skyid: '',
  id: '',
  audioURL: ''
};

const mdState_z: IMDstate_z = {
  mdContent_z: '',
  requestStatus_z: RequestStatus.Idle,
  targetObject_z: initialTargetObject_z,
  fullFileName_z: ''
};

const useMdStore_z = create<any>()(
  devtools(
    (set) => ({
      mdState_z,
      setTargetObject_z: (value: TOneWord) => {
        set(
          (state: any) => ({
            mdState_z: {
              ...state.mdState_z,
              targetObject_z: value
            }
          }),
          false,
          'setTargetObject'
        );
      },

      setFullFileName_z: (value: string) => {
        set(
          (state: any) => ({
            mdState_z: {
              ...state.mdState_z,
              fullFileName_z: value
            }
          }),
          false,
          'setFullFileName_z'
        );
      },

      setMdText_z: async (value: string) => {
        try {
          const text = await fetchText(value);
          set(
            (state: any) => ({
              mdState_z: {
                ...state.mdState_z,
                mdContent_z: text,
                requestStatus_z: RequestStatus.Success
              }
            }),
            false,
            'md-state'
          );
        } catch (err) {
          set({ requestStatus_z: RequestStatus.Failed }, false, 'md-state');
        }
      }
    }),
    devtoolsOptions
  )
);

// селекторы
export const useMdSelectors_z = () => ({
  targetObject_z: useMdStore_z((state) => state.mdState_z.targetObject_z),
  fullFileName_z: useMdStore_z((state) => state.mdState_z.fullFileName_z),
  mdContent_z: useMdStore_z((state) => state.mdState_z.mdContent_z),
  requestStatus_z: useMdStore_z((state) => state.mdState_z.requestStatus_z)
});

//  экшены
export const useMdActions_z = () => ({
  setTargetObject_z: useMdStore_z((state) => state.setTargetObject_z),
  setFullFileName_z: useMdStore_z((state) => state.setFullFileName_z),
  setMdText_z: useMdStore_z((state) => state.setMdText_z)
});
