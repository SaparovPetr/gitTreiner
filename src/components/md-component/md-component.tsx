import React, { ReactNode, useEffect, useState } from 'react';

import { getMDcontent } from '@slices/md-slice';
import { selectFullFileName } from '@slices/words-slice';
import MarkDown from 'markdown-to-jsx';

import styles from './md-component.module.css';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchMDcontent } from '../../services/thunks/fetchMDcontent';

export const MdComponent = () => {
  const content = useAppSelector(getMDcontent);
  // const dispatch = useAppDispatch();

  // const fullFileName = useAppSelector(selectFullFileName);

  // useEffect(() => {
  //   dispatch(fetchMDcontent(fullFileName));
  // }, [fullFileName]);

  return (
    <div className={styles.mdContainer}>
      <MarkDown>{content}</MarkDown>
    </div>
  );
};

export default MdComponent;
