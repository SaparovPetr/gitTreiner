import { useEffect, useState } from 'react';

import { Loader } from '@components/atoms/Loader/Loader';
import { RoundButton } from '@components/atoms/RoundButton/RoundButton';
import { MdComponent } from '@components/organisms/MdComponent/MdComponent';
import { audioCallback } from '@utils/audioCallback';
import { copyTextToClipboard } from '@utils/copyTextToClipboard';
import { AppMode } from '@utils-types';
import { Link } from 'react-router-dom';

import styles from './WordModalContent.module.css';
import { useModeSelectors } from '@zStore/zModeStore';
import { useMdSelectors_z } from '@zStore/zMdState_z';

export type TWordModalContentProps = {
  closeModal?: () => void;
  linkToPublicFile: string;
  linkToRepo: string;
};

export const WordModalContent = ({
  closeModal,
  linkToRepo
}: TWordModalContentProps) => {
  const { modeState } = useModeSelectors();
  const { targetObject_z } = useMdSelectors_z();

  const [isFirstButtonLoading, setIsFirstButtonLoading] = useState(false);
  const [isFirstButtonCopied, setIsFirstButtonCopied] = useState(false);

  const [isSecondButtonLoading, setIsSecondButtonLoading] = useState(false);
  const [isSecondButtonCopied, setIsSecondButtonCopied] = useState(false);

  const [isErrorCreating, setIsErrorCreating] = useState(false);

  // (заметка № 15)
  useEffect(() => {
    // (заметка № 14)
    if (modeState === AppMode.Es400) {
      audioCallback(targetObject_z.audioURL);
    } else {
      audioCallback(
        `https://vimbox-tts.skyeng.ru/api/v1/tts?text=${targetObject_z.targetWord}&lang=en&voice=male_2`
      );
    }
    copyTextToClipboard(
      `${targetObject_z?.targetWord} - ${targetObject_z?.translating}`
    );
  }, []);

  const knockToAI = async () =>
    fetch(`https://api.deepseek.com/v1/chat/completions/`, {
      method: 'POST',
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: `Give me seven and the most simple and popular collocations with that English phrase in the meaning that wrote in Russian in the end of this prompt. Don't paraphrase this term. Mark each collocation by number. Also give me one example (intermediate level) in different tenses: Present Perfect, Past Simple, Past Continuous, and Past Perfect. Give me only result of inquire, don't write own comments. Use only English. Make centences in the dashed list. Don't use markdown at all. Don't emphasize any words. ${targetObject_z.targetWord} - ${targetObject_z.translating}`
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

  const knockAndGo = async () => {
    setIsFirstButtonLoading(true);

    try {
      const answer = await knockToAI();
      setIsFirstButtonLoading(false);
      setIsFirstButtonCopied(true);
      copyTextToClipboard(answer);
      window.open(
        `${linkToRepo}/edit/main/${targetObject_z?.targetWord.toLowerCase()}%20-%20${targetObject_z?.translating.toLowerCase()}.md`,
        '_blank'
      );
    } catch (error) {
      setIsErrorCreating(true);
    }
  };

  const knockAndCopy = async () => {
    setIsSecondButtonLoading(true);

    try {
      const answer = await knockToAI();
      setIsSecondButtonLoading(false);
      setIsSecondButtonCopied(true);
      copyTextToClipboard(answer);
    } catch (error) {
      setIsErrorCreating(true);
    }
  };

  return (
    <div className={styles.modalContent}>
      <div className={styles.phraseZone}>
        {targetObject_z?.targetWord} - {targetObject_z?.translating}
      </div>

      <MdComponent />
      <div className={styles.buttonsZone}>
        <RoundButton disabled={false} onClickFunc={knockAndGo}>
          {!isFirstButtonCopied &&
            !isFirstButtonLoading &&
            !isErrorCreating &&
            'create and edit'}
          {isFirstButtonLoading && <Loader />}
          {isFirstButtonCopied && '🤘'}
          {isErrorCreating && 'error 😢'}
        </RoundButton>
        <div className={styles.twoButtons}>
          <RoundButton disabled={false} onClickFunc={knockAndCopy}>
            {!isSecondButtonCopied &&
              !isSecondButtonLoading &&
              !isErrorCreating &&
              'create'}
            {isSecondButtonLoading && <Loader />}
            {isSecondButtonCopied && '🤘'}
            {isErrorCreating && '😢'}
          </RoundButton>
          <RoundButton disabled={false}>
            <Link
              to={`${linkToRepo}/edit/main/${targetObject_z?.targetWord.toLowerCase()}%20-%20${targetObject_z?.translating.toLowerCase()}.md`}
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
