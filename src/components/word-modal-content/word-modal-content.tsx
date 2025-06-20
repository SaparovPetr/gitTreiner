import { useEffect, useState } from 'react';

import Loader from '@components/loader/loader';
import MdComponent from '@components/md-component/md-component';
import { RoundButton } from '@components/round-button/round-button';
import { selectPickedWordObject } from '@slices/md-slice';
import { selectModeState } from '@slices/mode-slice';
import { audioCallback } from '@utils/audio-callback';
import { copyTextToClipboard } from '@utils/copy-text-to-clipboard';
import { AppMode, TWordModalContentProps } from '@utils-types';
import { Link } from 'react-router-dom';

import styles from './word-modal-content.module.css';
import { useAppSelector } from '../../services/store';

const WordModalContent = ({
  closeModal,
  linkToRepo
}: TWordModalContentProps) => {
  const word = useAppSelector(selectPickedWordObject);
  const currientMode = useAppSelector(selectModeState);

  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // (заметка № 15)
  useEffect(() => {
    // (заметка № 14)
    if (currientMode === AppMode.Es400) {
      audioCallback(word.audioURL);
    } else {
      audioCallback(
        `https://vimbox-tts.skyeng.ru/api/v1/tts?text=${word.targetWord}&lang=en&voice=male_2`
      );
    }
    checkBotStatus();
    copyTextToClipboard(`${word?.targetWord} - ${word?.translating}`);
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
        {word?.targetWord} - {word?.translating}
      </div>

      <MdComponent />
      <div className={styles.buttonsZone}>
        {!isReady && (
          <RoundButton onClickFunc={knockToAI} disabled>
            {isLoading ? <Loader /> : 'AI offline'}
          </RoundButton>
        )}

        {isReady && (
          <RoundButton disabled={false} onClickFunc={knockToAI}>
            {' '}
            {isLoading ? <Loader /> : 'create note'}{' '}
          </RoundButton>
        )}

        <div className={styles.twoButtons}>
          <RoundButton disabled={false}>
            <Link
              to={`${linkToRepo}/edit/main/${word?.targetWord.toLowerCase()}%20-%20${word?.translating.toLowerCase()}.md`}
              target='_blank'
            >
              ✏
            </Link>
          </RoundButton>

          <RoundButton disabled={false} onClickFunc={closeModal}>
            ✕
          </RoundButton>
        </div>
      </div>
    </div>
  );
};

export default WordModalContent;
