import './main.css';
import { useEffect } from 'react';

import { Layout } from '@components/modal/layout';
import { Modal } from '@components/modal/modal';
import ModalContent from '@components/modal-content/modal-content';
import { MainPage } from '@pages/main-page/main-page';
import { setCounter } from '@slices/counter-slice';
import { setMode } from '@slices/mode-slice';
import { makeCollection, selectCollection } from '@slices/words-slice';
import { AppMode, User } from '@utils-types';
import { threeThousandWordBase } from '@word-bases/3k';
import { aWordBase } from '@word-bases/a';
import { bOneWordBase } from '@word-bases/b-one';
import { bTwoWordBase } from '@word-bases/b-two';
import { difWordBase } from '@word-bases/dif';
import { Route, Routes, useLocation } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../services/store';
import {
  currientModeFromLocalStorage,
  counterFromLocalStorage
} from '../../utils/localstorage-functionality';
import { UserData } from '@//UserData';

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const user: User = new UserData('SaparovPetr', 'mdWords');

  useEffect(() => {
    if (!currientModeFromLocalStorage) {
      dispatch(setMode(AppMode.Dif)); // (заметка № 1)
    }

    if (currientModeFromLocalStorage) {
      dispatch(setMode(currientModeFromLocalStorage));
    }

    if (currientModeFromLocalStorage === AppMode.Dif) {
      dispatch(makeCollection(difWordBase)); // (заметка № 2)
    }

    if (currientModeFromLocalStorage === AppMode.ThreeK) {
      dispatch(makeCollection(threeThousandWordBase));
    }

    if (currientModeFromLocalStorage === AppMode.A) {
      dispatch(makeCollection(aWordBase));
    }

    if (currientModeFromLocalStorage === AppMode.B1) {
      dispatch(makeCollection(bOneWordBase));
    }

    if (currientModeFromLocalStorage === AppMode.B2) {
      dispatch(makeCollection(bTwoWordBase));
    }

    dispatch(setCounter(Number(counterFromLocalStorage)));
  }, []);

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<MainPage />} />
        <Route path='/gitTreiner' element={<MainPage />} />
        <Route
          path='/gitTreiner/word'
          element={
            <Layout>
              <ModalContent
                linkToPublicFile={user.linkToPublicFile}
                linkToRepo={user.linkToRepo}
              />
            </Layout>
          }
        />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route path='/gitTreiner' element={<MainPage />} />
          <Route
            path='/gitTreiner/word'
            element={
              <Layout>
                <Modal>
                  <ModalContent
                    linkToPublicFile={user.linkToPublicFile}
                    linkToRepo={user.linkToRepo}
                  />
                </Modal>
              </Layout>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
