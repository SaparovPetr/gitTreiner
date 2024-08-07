import './app.css';
import React, { StrictMode, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../services/store';
import { addIdToEachWord, fetchWords } from '../../services/thunks/thunk';
import { selectWords } from '../../services/slices/words-slice';
import { MainPage } from '../../pages/main-page/main-page';
import { Modal } from '../modal/modal';

import { Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from '../modal/layout';
import ModalContent from '../modal-content/modal-content';
import { setCounter } from '../../services/slices/counter-slice';
import { currientDate } from '../../utils/currient-date';
import { setShowModal } from '../../services/slices/modal-slice';

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const words = useAppSelector(selectWords);
  const backgroundLocation = location.state?.backgroundLocation;

  const counterFromLocalStorage = localStorage.getItem(
    `effortCounterInStorage-${currientDate}`
  );

  useEffect(() => {
    dispatch(fetchWords());
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
