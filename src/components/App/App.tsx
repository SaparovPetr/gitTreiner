import './main.css';
import { useEffect } from 'react';

import { AppMode } from '@utils-types';
import { Route, Routes, useLocation } from 'react-router-dom';

import { MainPage } from '../../pages/main-page/main-page';
import { setCounter } from '../../services/slices/counter-slice';
import { setShowModal } from '../../services/slices/modal-slice';
import { setMode } from '../../services/slices/mode-slice';
import { selectCollection } from '../../services/slices/words-slice';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { addIdToEachWord, fetchCollection } from '../../services/thunks/thunk';
import {
  currientModeFromLocalStorage,
  counterFromLocalStorage
} from '../../utils/localstorage-functionality';
import { firstWordBase } from '../../word-bases/first-word-base';
import { secondWordBase } from '../../word-bases/second-word-base';
import { Layout } from '../modal/layout';
import { Modal } from '../modal/modal';
import ModalContent from '../modal-content/modal-content';

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const collection = useAppSelector(selectCollection);
  const backgroundLocation = location.state?.backgroundLocation;

  useEffect(() => {
    if (!currientModeFromLocalStorage) {
      dispatch(setMode(AppMode.Large));
    }

    if (currientModeFromLocalStorage) {
      dispatch(setMode(currientModeFromLocalStorage));
    }

    if (currientModeFromLocalStorage === AppMode.Large) {
      dispatch(fetchCollection(firstWordBase));
    }

    if (currientModeFromLocalStorage === AppMode.Small) {
      dispatch(fetchCollection(secondWordBase));
    }

    dispatch(addIdToEachWord(collection));
    dispatch(setCounter(Number(counterFromLocalStorage)));
    dispatch(setShowModal(false));
  }, [dispatch]);

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<MainPage />} />
        <Route path='/gitTreiner/' element={<MainPage />} />
        <Route
          path='/:id'
          element={
            <Layout>
              <ModalContent />
            </Layout>
          }
        />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route
            path='/:id'
            element={
              <Layout>
                <Modal>
                  <ModalContent />
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
