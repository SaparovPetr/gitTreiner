import { useEffect } from 'react';

import { Link } from 'react-router-dom';

import styles from './modal-content.module.css';
import { selectFirstWord } from '../../services/slices/words-slice';
import { useAppSelector } from '../../services/store';
import { copyTextToClipboard } from '../../utils/copy-text-to-clipboard';

const ModalContent = () => {
  const word = useAppSelector(selectFirstWord);

  useEffect(() => {
    copyTextToClipboard(`${word.targetWord} - ${word.translating}`);
  }, []);

  return (
    <div className={styles.modalContent}>
      <div className={styles.phraseZone}>
        {word.targetWord} - {word.translating}
      </div>

      <iframe
        src={`https://saparovpetr.github.io/mdWords/${word.targetWord}%20-%20${word.translating}.md`}
        id='iframe'
      />

      <Link
        className={styles.markerZone}
        to={`https://github.com/SaparovPetr/mdWords/edit/main/${word.targetWord.toLowerCase()}%20-%20${word.translating.toLowerCase()}.md`}
        target='_blank'
      >
        &#9998;
      </Link>
    </div>
  );
};

export default ModalContent;
