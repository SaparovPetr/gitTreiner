import { FC } from 'react';
import './app-header.css';
import { memo } from 'react';

export const AppHeader: FC = memo(() => (
  <header>
    <div className='app-header'>
      <div>Git_ </div>
      <div> treiner</div>
    </div>
  </header>
));
