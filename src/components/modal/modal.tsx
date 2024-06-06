import React from 'react';
import { useNavigate } from 'react-router-dom';
import './modal.css';

export const Modal = ({ children }: React.PropsWithChildren) => {
  const navigate = useNavigate();
  const onClose = () => {
    navigate(-1);
  };

  return (
    <>
      <div className='overlay' onClick={onClose} />
      <div className='popup'>
        {children}
        <button onClick={onClose} />
      </div>
    </>
  );
};
