import { useEffect } from 'react';

import { Layout } from '@components/modal/layout';
import { Modal } from '@components/modal/modal';
import { NotFound404 } from '@components/not-fount-404/not-fount-404';
import SettingModalContent from '@components/setting-modal-content/setting-modal-content';
import WordModalContent from '@components/word-modal-content/word-modal-content';
import { MainPage } from '@pages/main-page/main-page';
import { setCounter } from '@slices/counter-slice';
import { setShowModal } from '@slices/modal-slice';
import { setMode } from '@slices/mode-slice';
import { makeCollection } from '@slices/words-slice';
import {
  counterFromLocalStorage,
  currientModeFromLocalStorage
} from '@utils/localstorage-functionality';
import { AppMode, IUser } from '@utils-types';
import { threeThousandWordBase } from '@word-bases/3k';
import { aWordBase } from '@word-bases/a';
import { bOneWordBase } from '@word-bases/b-one';
import { bTwoWordBase } from '@word-bases/b-two';
import { difWordBase } from '@word-bases/dif';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../services/store';
import { User } from '../../user';

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const navigate = useNavigate();

  const user: IUser = new User(
    `${localStorage.getItem(`UserName`)}`,
    `${localStorage.getItem(`UserRepo`)}`
  );

  const closeModal = () => {
    dispatch(setShowModal(false));
    setTimeout(() => {
      navigate(-1);
    }, 200);
  };

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
        <Route path='*' element={<NotFound404 />} />

        <Route path='/gitTreiner' element={<MainPage />} />
        <Route
          path='/gitTreiner/word'
          element={
            <Layout>
              <WordModalContent
                closeModal={closeModal}
                linkToPublicFile={user.linkToPublicFile}
                linkToRepo={user.linkToRepo}
              />
            </Layout>
          }
        />
        <Route
          path='/gitTreiner/setting'
          element={
            <Layout>
              <SettingModalContent closeModal={closeModal} />
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
                <Modal closeModal={closeModal}>
                  <WordModalContent
                    closeModal={closeModal}
                    linkToPublicFile={user.linkToPublicFile}
                    linkToRepo={user.linkToRepo}
                  />
                </Modal>
              </Layout>
            }
          />
          <Route
            path='/gitTreiner/setting'
            element={
              <Layout>
                <Modal closeModal={closeModal}>
                  <SettingModalContent closeModal={closeModal} />
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
