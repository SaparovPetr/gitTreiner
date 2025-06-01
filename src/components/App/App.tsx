import { useEffect } from 'react';

import ErrorHint from '@components/error-hint/error-hint';
import { Layout } from '@components/modal/layout';
import { Modal } from '@components/modal/modal';
import { NotFound404 } from '@components/not-fount-404/not-fount-404';
import SettingModalContent from '@components/setting-modal-content/setting-modal-content';
import WordModalContent from '@components/word-modal-content/word-modal-content';
import { MainPage } from '@pages/main-page/main-page';
import { setCounter } from '@slices/counter-slice';
import { getStatus, resetStore } from '@slices/md-slice';
import { setShowModal } from '@slices/modal-slice';
import { setMode } from '@slices/mode-slice';
import { makeCollection } from '@slices/words-slice';
import {
  counterFromLocalStorage,
  currientModeFromLocalStorage,
  setEntryInLocalStorage
} from '@utils/localstorage-functionality';
import { AppMode, IUser, RequestStatus } from '@utils-types';
import { threeThousandWordBase } from '@word-bases/3k';
import { aWordBase } from '@word-bases/a';
import { bOneWordBase } from '@word-bases/b-one';
import { bTwoWordBase } from '@word-bases/b-two';
import { difWordBase } from '@word-bases/dif';
import { spanish400 } from '@word-bases/spanish400';
import { spanish500 } from '@word-bases/spanish500';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../services/store';
import { User } from '../../user';

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const navigate = useNavigate();

  const mdFetchStatus = useAppSelector(getStatus);

  const user: IUser = new User(
    `${localStorage.getItem(`UserName`)}`,
    `${localStorage.getItem(`UserRepo`)}`
  );

  const closeModal = () => {
    dispatch(setShowModal(false));
    setEntryInLocalStorage('modalIsOpen', 'false');

    setTimeout(() => {
      navigate(-1);
      dispatch(resetStore());
    }, 200);
  };

  useEffect(() => {
    if (!currientModeFromLocalStorage) {
      dispatch(setMode(AppMode.Dif)); // (заметка № 1)
    } else {
      dispatch(setMode(currientModeFromLocalStorage));
    }

    switch (currientModeFromLocalStorage) {
      case AppMode.Dif:
        dispatch(makeCollection(difWordBase)); // (заметка № 2)
        break;
      case AppMode.ThreeK:
        dispatch(makeCollection(threeThousandWordBase));
        break;
      case AppMode.A:
        dispatch(makeCollection(aWordBase));
        break;
      case AppMode.B1:
        dispatch(makeCollection(bOneWordBase));
        break;
      case AppMode.B2:
        dispatch(makeCollection(bTwoWordBase));
        break;
      case AppMode.Es400:
        dispatch(makeCollection(spanish400));
        break;
      case AppMode.Es500:
        dispatch(makeCollection(spanish500));
        break;
    }

    dispatch(setCounter(Number(counterFromLocalStorage)));
  }, []);

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<MainPage />} />
        <Route path='*' element={<NotFound404 />} />

        <Route path='/' element={<MainPage />} />
        <Route
          path='/word'
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
          path='/setting'
          element={
            <Layout>
              <SettingModalContent closeModal={closeModal} />
            </Layout>
          }
        />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route path='/' element={<MainPage />} />
          {mdFetchStatus === RequestStatus.Success && (
            <Route
              path='/word'
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
          )}
          {mdFetchStatus === RequestStatus.Failed && (
            <Route
              path='/word'
              element={
                <Layout>
                  <Modal closeModal={closeModal}>
                    <ErrorHint closeModal={closeModal} />
                  </Modal>
                </Layout>
              }
            />
          )}

          <Route
            path='/setting'
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
