import { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import styles from './word-modal-content.module.css';
import { setShowModal } from '../../services/slices/modal-slice';
import {
  selectCollection,
  selectFirstWord
} from '../../services/slices/words-slice';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { copyTextToClipboard } from '../../utils/copy-text-to-clipboard';
import { audioCallback } from '@//utils/audio-callback';

const WordModalContent = ({ linkToPublicFile, linkToRepo }: any) => {
  const word = useAppSelector(selectFirstWord);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const collection = useAppSelector(selectCollection);

  const onClose = () => {
    navigate(-1);
  };

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
          console.log(res);
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
        console.log(data.result);
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
          <button className={styles.button} disabled>
            {isLoading ? <div className={styles.loader} /> : 'AI offline'}
          </button>
        )}

        {isReady && (
          <a className={styles.button} onClick={knockToAI}>
            {isLoading ? <div className={styles.loader} /> : 'generate with AI'}
          </a>
        )}

        <div className={styles.twoButtons}>
          <Link
            className={styles.button}
            to={`${linkToRepo}/edit/main/${word.targetWord.toLowerCase()}%20-%20${word.translating.toLowerCase()}.md`}
            target='_blank'
          >
            edit
          </Link>

          <a
            className={styles.button}
            onClick={() => {
              dispatch(setShowModal(false));
              setTimeout(onClose, 200);
            }}
          >
            close
          </a>
        </div>
      </div>
    </div>
  );
};

export default WordModalContent;
