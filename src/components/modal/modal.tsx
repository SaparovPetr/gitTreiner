import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './modal.module.css';

export const Modal = ({ children }: React.PropsWithChildren) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        navigate(-1);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  const navigate = useNavigate();
  const onClose = () => {
    navigate(-1);
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.popup}>
        {children}
        <button className={styles.popupButton} onClick={onClose} />
      </div>
    </>
  );
};
