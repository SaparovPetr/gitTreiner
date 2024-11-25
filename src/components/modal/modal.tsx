import React, { memo, useEffect, useRef } from 'react';

import { selectModalState, setShowModal } from '@slices/modal-slice';
import { TModalProps } from '@utils-types';
import { CSSTransition } from 'react-transition-group';

import './modal.css';
import styles from './modal.module.css';
import { useAppDispatch, useAppSelector } from '../../services/store';

export const Modal = memo(({ children, closeModal }: TModalProps) => {
  const showModal = useAppSelector(selectModalState);
  const nodeRef = useRef(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setShowModal(true));
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

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
          <div className={styles.popup}>{children}</div>
        </div>
      </CSSTransition>
    </>
  );
});
