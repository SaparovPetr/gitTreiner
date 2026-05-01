import { useEffect } from 'react';

import { ErrorHint } from '@components/organisms/ErrorHint/ErrorHint';
import { SettingModalContent } from '@components/organisms/SettingModalContent/SettingModalContent';
import { WordModalContent } from '@components/organisms/WordModalContent/WordModalContent';
import { Modal } from '@components/templates/Modal/Modal';
import { MainPage } from '@pages/MainPage/MainPage';
import { NotFound404 } from '@pages/NotFoundPage/NotFoundPage';
import { WelcomePage } from '@pages/WelcomePage/WelcomePage';
import {
  counterFromLocalStorage,
  currientModeFromLocalStorage,
  isFirstStart,
  setEntryInLocalStorage
} from '@utils/localStorageFunctionality';
import { AppMode, IUser, RequestStatus } from '@utils-types';
import { threeThousandWordBase } from '@word-bases/3k';
import { aWordBase } from '@word-bases/a';
import { bOneWordBase } from '@word-bases/b-one';
import { bTwoWordBase } from '@word-bases/b-two';
import { difWordBase } from '@word-bases/dif';
import { spanish400 } from '@word-bases/spanish400';
import { spanish500 } from '@word-bases/spanish500';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { User } from '../user';
import { useCounterActions } from '@store/useCounterStore';
import { useCollectionActions } from '@store/useCollectionStore';
import { useModalActions } from '@store/useModalStore';
import { useModeActions } from '@store/useModeStore';
import { useMdActions, useMdSelectors } from '@store/useMdStore';

export const App = () => {
  const { requestStatus } = useMdSelectors();

  const { setModeState } = useModeActions();
  const { setShowModalState } = useModalActions();
  const { setCollectionState } = useCollectionActions();

  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const navigate = useNavigate();

  const user: IUser = new User(
    `${localStorage.getItem(`UserName`)}`,
    `${localStorage.getItem(`UserRepo`)}`
  );

  const { setEffortCounterState } = useCounterActions();
  const { setEmptyMdText } = useMdActions();

  const closeModal = () => {
    setShowModalState(false);
    setEntryInLocalStorage('modalIsOpen', 'false');

    setTimeout(() => {
      navigate(-1);
      setEmptyMdText();
    }, 200);
  };

  useEffect(() => {
    if (!currientModeFromLocalStorage) {
      setModeState(AppMode.Dif); // (заметка № 1)
    } else {
      setModeState(currientModeFromLocalStorage);
    }

    switch (currientModeFromLocalStorage) {
      case AppMode.Dif:
        setCollectionState(difWordBase); // (заметка № 2)
        break;
      case AppMode.ThreeK:
        setCollectionState(threeThousandWordBase);
        break;
      case AppMode.A:
        setCollectionState(aWordBase);
        break;
      case AppMode.B1:
        setCollectionState(bOneWordBase);
        break;
      case AppMode.B2:
        setCollectionState(bTwoWordBase);
        break;
      case AppMode.Es400:
        setCollectionState(spanish400);
        break;
      case AppMode.Es500:
        setCollectionState(spanish500);
        break;
    }

    setEffortCounterState(Number(counterFromLocalStorage));
  }, []);

  useEffect(() => {
    if (!isFirstStart) {
      navigate('/welcome');
    } else {
      navigate('/main');
    }
  }, []);

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path='/main' element={<MainPage />} />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/welcome' element={<WelcomePage />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          {requestStatus === RequestStatus.Success && (
            <Route
              path='/word'
              element={
                <Modal closeModal={closeModal}>
                  <WordModalContent
                    closeModal={closeModal}
                    linkToPublicFile={user.linkToPublicFile}
                    linkToRepo={user.linkToRepo}
                  />
                </Modal>
              }
            />
          )}
          {requestStatus === RequestStatus.Failed && (
            <Route
              path='/word'
              element={
                <Modal closeModal={closeModal}>
                  <ErrorHint closeModal={closeModal} />
                </Modal>
              }
            />
          )}

          <Route
            path='/setting'
            element={
              <Modal closeModal={closeModal}>
                <SettingModalContent closeModal={closeModal} />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};
