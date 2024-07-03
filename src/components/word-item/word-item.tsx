/* eslint-disable prettier/prettier */
import React, { StrictMode } from 'react';
import styles from './word-item.module.css';

import { Layout } from '../modal/layout';
import { deleteWord } from '../../services/thunks/thunk';
import {
  switchLanguageState,
  selectCurrientLanguage
} from '../../services/slices/translation-slace';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { Link, useLocation } from 'react-router-dom';
import { TOneWord } from '@utils-types';

const WordItem = ({ id, targetWord, translating }: TOneWord) => {
  const dispatch = useAppDispatch();
  const currientLanguage = useAppSelector(selectCurrientLanguage);
  const location = useLocation();

  const switchLanguage = () => {
    if (currientLanguage === 'inEnglish') {
      dispatch(switchLanguageState('inRussian'));
    } else {
      dispatch(switchLanguageState('inEnglish'));
    }
  };

  const skipWordCallback = (id: string) => {
    dispatch(deleteWord(id));

    if (currientLanguage === 'inRussian') {
      dispatch(switchLanguageState('inEnglish'));
    }
  };

  return (
    <Layout>
      <div className={styles.cardContainer}>
        <div className={styles.cardWordArea} onClick={() => switchLanguage()}>
          {currientLanguage === 'inEnglish' ? targetWord : translating}
        </div>
        <div className={styles.cardBottomArea}>
          <Link
            className={styles.button}
            to={'/gitTreiner/word'}
            state={{ backgroundLocation: location }}
          >
            &uarr;
          </Link>

          <div
            className={styles.button}
            onClick={() => {
              skipWordCallback(id);
            }}
          >
            &rarr;
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WordItem;

// анимация разворота карточки:

// const revertCard = () => {
//   if (!document.querySelector('.showBack')) {
//     document.querySelector('.card')?.classList.add('showBack');
//   } else document.querySelector('.card')?.classList.remove('showBack');
// }

//   return (
//     <Layout>
//       <div className='item-container card'>
//         <div className='content'>
//           <div className='front'>
//             <div className='word-area title' onClick={() => revertCard()}>
//               {targetWord}
//             </div>
//             <div className='item-bottom-area subtitle'>
//               <Link
//                 className='modal-button'
//                 to={'/gitTreiner/word'}
//                 state={{ backgroundLocation: location }}
//               >
//                 &uarr;
//               </Link>

//               <button
//                 className='skip-button'
//                 onClick={() => {
//                   skipWordCallback(id);
//                 }}
//               >
//                 &rarr;
//               </button>
//             </div>
//           </div>

//           <div className='back'>
//             <div className='word-area title' onClick={() => revertCard()}>
//               {translating}
//             </div>

//             <div className='item-bottom-area subtitle'>
//               <Link
//                 className='modal-button'
//                 to={'/gitTreiner/word'}
//                 state={{ backgroundLocation: location }}
//               >
//                 &uarr;
//               </Link>

//               <button
//                 className='skip-button'
//                 onClick={() => {
//                   skipWordCallback(id);
//                 }}
//               >
//                 &rarr;
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };
