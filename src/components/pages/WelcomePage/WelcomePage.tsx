import { FC } from 'react';

import { RoundButton } from '@components/atoms/RoundButton/RoundButton';
import { markTheFirstStart } from '@utils/localStorageFunctionality';
import { Link, useNavigate } from 'react-router-dom';

import styles from './WelcomePage.module.css';

export const WelcomePage: FC = () => {
  const navigate = useNavigate();
  const goButtonHandler = () => {
    markTheFirstStart(), navigate('/main');
  };

  return (
    <main className={styles.mainContainer}>
      <div className={styles.welcomeContainer}>
        <h2>Welcome</h2>
        <div>
          This app is designed to reinforce your English and Spanish vocabulary.
          It’s based on the idea of reviewing words from notes (markdown files)
          stored in your personal GitHub repository.
        </div>
        <h2>How it works:</h2>
        <div>1. Sign up and log in to GitHub;</div>
        <div>
          2. Fork either the{' '}
          <Link to={'https://github.com/SaparovPetr/myriadEmpty'}>
            <span className={styles.linkword}>
              English vocabulary repository
            </span>
          </Link>{' '}
          or this{' '}
          <Link to={'https://github.com/SaparovPetr/mdSpanishWords'}>
            <span className={styles.linkword}>one for Spanish</span>
          </Link>{' '}
          , then provide its details in the app settings;
        </div>
        <div>
          3. Optionally, provide your DeepSeek key. The model will create notes
          for you.
        </div>

        <RoundButton onClickFunc={goButtonHandler} disabled={false}>
          Go!
        </RoundButton>
      </div>
    </main>
  );
};
