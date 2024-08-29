import './app.css';
import { useEffect } from 'react';

import { AppMode } from '@utils-types';
import { Route, Routes, useLocation } from 'react-router-dom';

import { MainPage } from '../../pages/main-page/main-page';
import { setCounter } from '../../services/slices/counter-slice';
import { setShowModal } from '../../services/slices/modal-slice';
import { setMode } from '../../services/slices/mode-slice';
import { selectWords } from '../../services/slices/words-slice';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { addIdToEachWord, fetchWords } from '../../services/thunks/thunk';
import { currientDate } from '../../utils/currient-date';
import { secondWordBase } from '../../word-bases/secondWordBase';
import { myBase } from '../../word-bases/wordBase';
import { Layout } from '../modal/layout';
import { Modal } from '../modal/modal';
import ModalContent from '../modal-content/modal-content';

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const words = useAppSelector(selectWords);
  const backgroundLocation = location.state?.backgroundLocation;

  const counterFromLocalStorage = localStorage.getItem(
    `effortCounterInStorage-${currientDate}`
  );
  const currientModeFromLocalStorage = localStorage.getItem(`currientMode`);

  useEffect(() => {
    if (!currientModeFromLocalStorage) {
      dispatch(setMode(AppMode.Large));
    }

    if (currientModeFromLocalStorage) {
      dispatch(setMode(currientModeFromLocalStorage));
    }

    if (currientModeFromLocalStorage === AppMode.Large) {
      dispatch(fetchWords(myBase));
    }

    if (currientModeFromLocalStorage === AppMode.Small) {
      dispatch(fetchWords(secondWordBase));
    }

    dispatch(addIdToEachWord(words));
    dispatch(setCounter(Number(counterFromLocalStorage)));
    dispatch(setShowModal(false));
  }, [dispatch]);

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<MainPage />} />
        <Route path='/gitTreiner/' element={<MainPage />} />
        <Route
          path='/gitTreiner/word/'
          element={
            <Layout>
              <ModalContent />
            </Layout>
          }
        />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route path='/gitTreiner/' element={<MainPage />} />
          <Route
            path='/gitTreiner/word/'
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
