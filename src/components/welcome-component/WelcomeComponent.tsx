import { FC } from 'react';

import styles from './WelcomeComponent.module.css';
import { RoundButton } from '../RoundButton/RoundButton';
import { markTheFirstStart } from '@//utils/localstorage-functionality';

const WelcomeComponent: FC = () => (
  <div className={styles.welcomeContainer}>
    <div>👋</div>
    <div>Welcome to the GitTreiner!</div>
    <div>
      You can brush up words and edit Markdown notes for them from your GitHub.
    </div>
    <RoundButton onClickFunc={markTheFirstStart} disabled={false}>
      →
    </RoundButton>
  </div>
);
export default WelcomeComponent;
