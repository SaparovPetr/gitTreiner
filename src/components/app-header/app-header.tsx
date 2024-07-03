import { FC } from 'react';
import styles from './app-header.module.css';
import { memo } from 'react';

export const AppHeader: FC = memo(() => (
  <header>
    <div className={styles.appHeader}>
      <div>Git_ </div>
      <div>treiner</div>
    </div>
  </header>
));
