import { FC } from 'react';

import FunctionalComponent from '@components/functional-component/functional-component';

import styles from './main-page.module.css';

export const MainPage: FC = () => (
  <main className='app-container'>
    <div className={styles.functionalArea}>
      <FunctionalComponent />
    </div>
  </main>
);
