import { useEffect, useState } from 'react';

import { RoundButton } from '@components/round-button/round-button';
import { selectCollection, selectFirstWord } from '@slices/words-slice';
import { audioCallback } from '@utils/audio-callback';
import { copyTextToClipboard } from '@utils/copy-text-to-clipboard';
import { TWordModalContentProps } from '@utils-types';
import { Link } from 'react-router-dom';

import styles from './word-modal-content.module.css';
import { useAppSelector } from '../../services/store';

const WordModalContent = ({
  closeModal,
  linkToPublicFile,
  linkToRepo
}: TWordModalContentProps) => {
  const word = useAppSelector(selectFirstWord);

  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const collection = useAppSelector(selectCollection);

  // (заметка № 15)
  useEffect(() => {
    // (заметка № 14)
    audioCallback(collection);
    checkBotStatus();
    copyTextToClipboard(`${word.targetWord} - ${word.translating}`);
  }, []);

  const checkBotStatus = () => {
    fetch(`${localStorage.getItem(`linkToBot`)}/status`, {
      method: 'GET'
    })
      .then((res) => {
        if (res.ok) {
          console.log(`сервер на связи`);
          setIsReady(true);
        }
      })
      .catch((err) => {
        console.log(`Ошибка связи: ${err}`);
        setIsReady(false);
      });
  };

  const knockToAI = () => {
    setIsLoading(true);
    fetch(`${localStorage.getItem(`linkToBot`)}/predict`, {
      method: 'POST',
      body: JSON.stringify({
        message: `${word.targetWord} - ${word.translating}`
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'no-cors'
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })

      .then((data) => {
        setIsLoading(false);
        copyTextToClipboard(data.result);
        return data;
      })

      .catch((err) => {
        console.log(`Ошибка генерации: ${err}`);
      })

      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.modalContent}>
      <div className={styles.phraseZone}>
        {word.targetWord} - {word.translating}
      </div>

      <iframe
        src={`${linkToPublicFile}${word.targetWord}%20-%20${word.translating}.md`}
      />
      <div className={styles.buttonsZone}>
        {!isReady && (
          <RoundButton onClickFunc={knockToAI} disabled>
            {isLoading ? <div className={styles.loader} /> : 'AI offline'}
          </RoundButton>
        )}

        {isReady && (
          <RoundButton disabled={false} onClickFunc={knockToAI}>
            {' '}
            {isLoading ? <div className={styles.loader} /> : 'create note'}{' '}
          </RoundButton>
        )}

        <div className={styles.twoButtons}>
          <RoundButton disabled={false}>
            <Link
              to={`${linkToRepo}/edit/main/${word.targetWord.toLowerCase()}%20-%20${word.translating.toLowerCase()}.md`}
              target='_blank'
            >
              edit
            </Link>
          </RoundButton>

          <RoundButton disabled={false} onClickFunc={closeModal}>
            close
          </RoundButton>
        </div>
      </div>
    </div>
  );
};

export default WordModalContent;
