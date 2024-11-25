import { FC } from 'react';

import { RoundButton } from '@components/round-button/round-button';
import { markTheFirstStart } from '@utils/localstorage-functionality';
import { Link } from 'react-router-dom';

import styles from './welcome-component.module.css';

const WelcomeComponent: FC = () => (
  <div className={styles.welcomeContainer}>
    <h2>👋 Салют!</h2>
    <div>
      Это приложение для закрепления словарного запаса английского языка (уровни
      с A до B). Основано на идее повторения слов по заметкам (markdown-файлам)
      из твоего личного репозитория на GitHub.
    </div>
    <h2>Как это работает:</h2>
    <div>1. Зарегистрируйся и войди на GitHub;</div>
    <div>
      2. Форкни себе этот{' '}
      <Link to={'https://github.com/SaparovPetr/emptyMdFilesForFork'}>
        <span className={styles.linkword}>репозиторий</span>
      </Link>{' '}
      и укажи данные о нем в настройках приложения;
    </div>
    <div>
      3. Заполняй заметки к подзабытым словам, используя встроенный AI-сервис*.
    </div>
    <div className={styles.footnote}>
      * Ввиду отсутствия у меня бюджета на сервер, модель работает не всегда и
      активируется по личному запросу в{' '}
      <Link to={'https://t.me/SaparovPetr'}>
        <span className={styles.linkword}>телеграмм.</span>
      </Link>
    </div>

    <RoundButton onClickFunc={markTheFirstStart} disabled={false}>
      →
    </RoundButton>
  </div>
);
export default WelcomeComponent;
