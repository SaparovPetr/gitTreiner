import React, { memo, ReactElement, useEffect, useRef } from 'react';

import { selectModalState, setShowModal } from '@slices/modal-slice';
import { currientDate } from '@utils/currientDate';
import { setEntryInLocalStorage } from '@utils/localStorageFunctionality';
import { CSSTransition } from 'react-transition-group';

import './modal.css';
import styles from './Modal.module.css';
import { useAppDispatch, useAppSelector } from '../../../services/store';

type TModalProps = {
  children?: ReactElement;
  closeModal: () => void;
};

export const Modal = memo(({ children, closeModal }: TModalProps) => {
  const showModal = useAppSelector(selectModalState); // РТК
  const dispatch = useAppDispatch(); // РТК
  const nodeRef = useRef(null);

  useEffect(() => {
    dispatch(setShowModal(true));
    setEntryInLocalStorage('modalIsOpen', 'true');

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  const efforts = Number(
    localStorage.getItem(`effortCounterInStorage-${currientDate}`)
  );

  return (
    <>
      <CSSTransition
        in={showModal}
        nodeRef={nodeRef}
        timeout={200}
        classNames='modal'
        unmountOnExit
      >
        <div className='modal' ref={nodeRef}>
          <div className={styles.overlay} onClick={closeModal} />
          <div
            style={{
              backgroundColor:
                efforts < 10
                  ? 'var(--start-bg-color)'
                  : efforts < 15
                    ? 'var(--second-bg-color)'
                    : 'var(--third-bg-color)'
            }}
            className={styles.popup}
          >
            {children}
          </div>
        </div>
      </CSSTransition>
    </>
  );
});
