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
  const [isCopied, setIsCopied] = useState(false);
  const [isErrorCreating, setIsErrorCreating] = useState(false);

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
    copyTextToClipboard(`${word?.targetWord} - ${word?.translating}`);
  }, []);

  const knockToAI = async () =>
    fetch(`https://api.deepseek.com/v1/chat/completions/`, {
      method: 'POST',
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: `Give me seven and the most simple and popular collocations with that English phrase in the meaning that wrote in Russian in the end of this prompt. Don't paraphrase this term. Mark each collocation by number. Also give me one example (intermediate level) in different tenses: Present Perfect, Past Simple, Past Continuous, and Past Perfect. Give me only result of inquire, don't write own comments. Use only English. Make centences in the dashed list. Don't use markdown at all. Don't emphasize any words. ${word.targetWord} - ${word.translating}`
          }
        ],
        max_tokens: 300
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'no-cors',
        Authorization: `Bearer ${localStorage.getItem(`aiKey`)}`
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => data.choices[0].message.content);

  const knockAndCopy = async () => {
    setIsLoading(true);

    try {
      const answer = await knockToAI();
      setIsLoading(false);
      setIsCopied(true);
      copyTextToClipboard(answer);
    } catch (error) {
      setIsErrorCreating(true);
    }
  };

  const knockAndGo = async () => {
    setIsLoading(true);

    try {
      const answer = await knockToAI();
      setIsLoading(false);
      setIsCopied(true);
      copyTextToClipboard(answer);

      // Формируем URL
      const editUrl = `${linkToRepo}/edit/main/${word?.targetWord.toLowerCase()}%20-%20${word?.translating.toLowerCase()}.md`;

      // Автоматический переход в новой вкладке
      window.open(editUrl, '_blank');
    } catch (error) {
      setIsErrorCreating(true);
    }
  };

  return (
    <div className={styles.modalContent}>
      <div className={styles.phraseZone}>
        {word?.targetWord} - {word?.translating}
      </div>

      <MdComponent />
      <div className={styles.buttonsZone}>
        <RoundButton disabled={false} onClickFunc={knockAndGo}>
          {!isCopied && !isLoading && !isErrorCreating && 'create and edit'}
          {isLoading && <Loader />}
          {isCopied && '🤘'}
          {isErrorCreating && 'error creating'}
        </RoundButton>
        <div className={styles.twoButtons}>
          <RoundButton disabled={false} onClickFunc={knockAndCopy}>
            {!isCopied && !isLoading && !isErrorCreating && 'create'}
            {isLoading && <Loader />}
            {isCopied && '🤘'}
            {isErrorCreating && 'error creating'}
          </RoundButton>
          <RoundButton disabled={false}>
            <Link
              to={`${linkToRepo}/edit/main/${word?.targetWord.toLowerCase()}%20-%20${word?.translating.toLowerCase()}.md`}
              target='_blank'
            >
              edit
            </Link>
          </RoundButton>
        </div>
        <RoundButton disabled={false} onClickFunc={closeModal}>
          ✕
        </RoundButton>
      </div>
    </div>
  );
};

export default WordModalContent;
