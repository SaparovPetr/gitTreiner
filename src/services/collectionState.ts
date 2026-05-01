import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { TOneWord } from '@utils-types';
import { fetchCollection } from '@utils/fetchCollection';
const uuid = require('uuid');

const devtoolsOptions = {
  name: 'collection-store',
  enabled: process.env.NODE_ENV === 'development'
};

interface ICollectionState {
  collectionState: TOneWord[];
  setCollectionState: (value: any) => void;
  setTrimmedCollectionState: (value: any) => void;
}

const useCollectionZ = create<ICollectionState>()(
  devtools(
    (set, get) => ({
      collectionState: [],
      // (заметка № 4)
      setCollectionState: (value: TOneWord[]) => {
        const collection = fetchCollection(value);
        // (заметка № 5)
        const collectionWithIds = collection.map((element) => ({
          ...element,
          id: uuid.v4()
        }));
        set({ collectionState: collectionWithIds }, false, 'collection-state');
      },
      setTrimmedCollectionState: (value: any) => {
        set(
          {
            collectionState: (get().collectionState =
              get().collectionState.filter((word) => word.id !== value))
          },
          false,
          'collection-state'
        );
      }
    }),
    devtoolsOptions
  )
);

export const useCollectionSelectors = () => ({
  collectionState: useCollectionZ((state) => state.collectionState)
});

export const useCollectionActions = () => ({
  setCollectionState: useCollectionZ((state) => state.setCollectionState),
  setTrimmedCollectionState: useCollectionZ(
    (state) => state.setTrimmedCollectionState
  )
});
