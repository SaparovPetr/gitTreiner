import React, { ReactNode, useEffect, useState } from 'react';

import LoaderComponent from '@components/loader-component/loader-component';
import MarkDown from 'markdown-to-jsx';

import styles from './md-component.module.css';

type MdComponentProps = {
  file: string;
};

export const MdComponent = ({ file }: MdComponentProps) => {
  const [content, setContent] = useState('');

  const fetchMarkdown = async () => {
    try {
      const response = await fetch(file);
      const text = await response.text();
      setContent(text);
    } catch (err) {
      setContent(`# ERROR! 😿 Enter your details in the settings!`);
    }
  };

  useEffect(() => {
    fetchMarkdown();
  }, [file]);

  return (
    <div className={styles.mdContainer}>
      {!content.length && <LoaderComponent />}
      <MarkDown>{content}</MarkDown>
    </div>
  );
};

export default MdComponent;
