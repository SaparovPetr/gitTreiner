import { useEffect } from 'react';

import { OptionList } from '@components/molecules/OptionList/OptionList';
import { TOneWord } from '@utils-types';
import { Link, useLocation } from 'react-router-dom';

import styles from './TrialItemTemplate.module.css';

import { useMdActions, useMdSelectors } from '@store/mdState';

export const TrialItemTemplate = ({
  id,
  targetWord,
  translating,
  skyid,
  audioURL
}: TOneWord) => {
  const locationInTheApp = useLocation();

  const { fullFileName } = useMdSelectors();
  const { setTargetObject, setFullFileName, setMdText } = useMdActions();

  useEffect(() => {
    // (заметка № 14)
    setFullFileName(
      `${`https://${localStorage.getItem(`UserName`)}.github.io/${localStorage.getItem(`UserRepo`)}/`}${targetWord}%20-%20${translating}.md`
    ); // TODO нужно ли оно мне или лучше в онклике устанавливать путь?
  }, [targetWord]);

  const handleClick = () => {
    setTargetObject({ id, targetWord, translating, skyid, audioURL });
    setMdText(fullFileName);
  };

  return (
    <>
      {/* (заметка № 6) */}
      <div className={styles.cardContainer}>
        <Link
          onClick={handleClick}
          className={styles.cardWordArea}
          to='/word'
          state={{ backgroundLocation: locationInTheApp }}
        >
          {targetWord}
        </Link>
        {/* (заметка № 7) */}
        <OptionList
          targetWord={targetWord}
          translating={translating}
          id={id}
          skyid={skyid}
        />
      </div>
    </>
  );
};
