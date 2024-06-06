import { FC } from 'react';

import { AppHeader } from '../../components/app-header/app-header';
import FunctionalComponent from '../../components/functional-component/FunctionalComponent';

export const MainPage: FC = () => (
  <main>
    <div className='app-container'>
      <AppHeader />
      <FunctionalComponent />
    </div>
  </main>
);
