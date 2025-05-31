import { useEffect, useState } from 'react';

import { picData, setFullFileName } from '@slices/md-slice';
import { mapSearchResults } from '@utils/mapSearchResults';
import { TOneWord } from '@utils-types';
import { Link, useLocation } from 'react-router-dom';

import styles from './search-results.module.css';
import { useAppDispatch } from '../../services/store';
import { fetchMDcontent } from '../../services/thunks/fetchMDcontent';
import { aArr } from '../../word-bases/myriad/aArr';
import { bArr } from '../../word-bases/myriad/bArr';
import { cArr } from '../../word-bases/myriad/cArr';
import { dArr } from '../../word-bases/myriad/dArr';
import { difArr } from '../../word-bases/myriad/difArr';
import { eArr } from '../../word-bases/myriad/eArr';
import { fArr } from '../../word-bases/myriad/fArr';
import { gArr } from '../../word-bases/myriad/gArr';
import { hArr } from '../../word-bases/myriad/hArr';
import { iArr } from '../../word-bases/myriad/iArr';
import { jArr } from '../../word-bases/myriad/jArr';
import { kArr } from '../../word-bases/myriad/kArr';
import { lArr } from '../../word-bases/myriad/lArr';
import { mArr } from '../../word-bases/myriad/mArr';
import { nArr } from '../../word-bases/myriad/nArr';
import { oArr } from '../../word-bases/myriad/oArr';
import { pArr } from '../../word-bases/myriad/pArr';
import { qArr } from '../../word-bases/myriad/qArr';
import { rArr } from '../../word-bases/myriad/rArr';
import { sArr } from '../../word-bases/myriad/sArr';
import { tArr } from '../../word-bases/myriad/tArr';
import { uArr } from '../../word-bases/myriad/uArr';
import { vArr } from '../../word-bases/myriad/vArr';
import { wArr } from '../../word-bases/myriad/wArr';
import { xArr } from '../../word-bases/myriad/xArr';
import { yArr } from '../../word-bases/myriad/yArr';
import { zArr } from '../../word-bases/myriad/zArr';

const SearchResults = ({ stringFromInput }: any) => {
  const [state, setState] = useState<any>();
  const locationInTheApp = useLocation();
  const dispatch = useAppDispatch();

  const makeList = (oneArr: TOneWord[]) => {
    let arrWithRes = mapSearchResults(stringFromInput, oneArr).slice(0, 13);
    return arrWithRes;
  };

  useEffect(() => {
    const firstLetter = stringFromInput.charAt(0);
    const letterToArrayMap: { [key: string]: TOneWord[] } = {
      a: aArr,
      b: bArr,
      c: cArr,
      d: dArr,
      e: eArr,
      f: fArr,
      g: gArr,
      h: hArr,
      i: iArr,
      j: jArr,
      k: kArr,
      l: lArr,
      m: mArr,
      n: nArr,
      o: oArr,
      p: pArr,
      q: qArr,
      r: rArr,
      s: sArr,
      t: tArr,
      u: uArr,
      v: vArr,
      w: wArr,
      x: xArr,
      y: yArr,
      z: zArr
    };
    const selectedArray = letterToArrayMap[firstLetter] || difArr;
    setState(makeList(selectedArray));
  }, [stringFromInput]);

  const handleClick = (index: number) => {
    dispatch(picData(state[index]));
    dispatch(
      setFullFileName(
        `${`https://${localStorage.getItem(`UserName`)}.github.io/${localStorage.getItem(`UserRepo`)}/`}${state[index].targetWord}%20-%20${state[index].translating}.md`
      )
    );
    dispatch(
      fetchMDcontent(
        `${`https://${localStorage.getItem(`UserName`)}.github.io/${localStorage.getItem(`UserRepo`)}/`}${state[index].targetWord}%20-%20${state[index].translating}.md`
      )
    );
  };

  return (
    <div className={styles.searchResultsContainer}>
      {state &&
        stringFromInput.length !== 0 &&
        state.map((item: TOneWord, index: number) => (
          <Link
            className={styles.link}
            key={index}
            onClick={() => handleClick(index)}
            to='/word'
            state={{ backgroundLocation: locationInTheApp }}
          >
            {`${item.targetWord} - ${item.translating}`}
          </Link>
        ))}
    </div>
  );
};
export default SearchResults;
