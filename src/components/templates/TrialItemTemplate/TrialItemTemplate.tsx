import { useEffect } from 'react';

import { OptionList } from '@components/molecules/OptionList/OptionList';
import { picData, setFullFileName } from '@slices/md-slice';
import { selectFullFileName } from '@slices/md-slice';
import { TOneWord } from '@utils-types';
import { Link, useLocation } from 'react-router-dom';

import styles from './TrialItemTemplate.module.css';
import { useAppDispatch, useAppSelector } from '../../../services/store';
import { fetchMDcontent } from '../../../services/thunks/fetchMDcontent';
import { useMdActions_z, useMdSelectors_z } from '@zStore/zMdState_z';

export const TrialItemTemplate = ({
  id,
  targetWord,
  translating,
  skyid,
  audioURL
}: TOneWord) => {
  const locationInTheApp = useLocation();
  const dispatch = useAppDispatch(); // РТК
  const fullFileName = useAppSelector(selectFullFileName); // РТК

  const { fullFileName_z, targetObject_z, mdContent_z, requestStatus_z } =
    useMdSelectors_z();
  const { setTargetObject_z, setFullFileName_z, setMdText_z } =
    useMdActions_z();

  useEffect(() => {
    // (заметка № 14)
    dispatch(
      setFullFileName(
        `${`https://${localStorage.getItem(`UserName`)}.github.io/${localStorage.getItem(`UserRepo`)}/`}${targetWord}%20-%20${translating}.md`
      )
    );

    setFullFileName_z(
      `${`https://${localStorage.getItem(`UserName`)}.github.io/${localStorage.getItem(`UserRepo`)}/`}${targetWord}%20-%20${translating}.md`
    ); // TODO нужно ли оно мне или лучше в онклике устанавливать путь?
  }, [targetWord]);

  const handleClick = () => {
    setTargetObject_z({ id, targetWord, translating, skyid, audioURL });
    setMdText_z(fullFileName_z);
    dispatch(picData({ id, targetWord, translating, skyid, audioURL }));
    dispatch(fetchMDcontent(fullFileName));
  };

  // useEffect(() => {
  //   console.log(mdContent_z);
  // }, [mdContent_z]);

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
