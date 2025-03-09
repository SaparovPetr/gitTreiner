import React, { ReactNode, useEffect, useState } from 'react';

import { getMDcontent } from '@slices/md-slice';
import MarkDown from 'markdown-to-jsx';

import styles from './md-component.module.css';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchMDcontent } from '../../services/thunks/fetchMDcontent';

type MdComponentProps = {
  file: string;
};

export const MdComponent = ({ file }: MdComponentProps) => {
  const content = useAppSelector(getMDcontent);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMDcontent(file));
  }, [file]);

  return (
    <div className={styles.mdContainer}>
      <MarkDown>{content}</MarkDown>
    </div>
  );
};

export default MdComponent;
