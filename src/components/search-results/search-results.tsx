import { useEffect, useState } from 'react';

// eslint-disable-next-line import/order
import { picData } from '@slices/modal-content-slice';
// eslint-disable-next-line import/order
import { mapSearchResults } from '@utils/mapSearchResults';

import { TOneWord } from '@utils-types';
import { Link, useLocation } from 'react-router-dom';

import styles from './search-results.module.css';
import { useAppDispatch } from '../../services/store';
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
    let arrWithRes = mapSearchResults(stringFromInput, oneArr).slice(0, 15);
    return arrWithRes;
  };

  useEffect(() => {
    if (stringFromInput.startsWith('a')) {
      setState(makeList(aArr));
    } else if (stringFromInput.startsWith('b')) {
      setState(makeList(bArr));
    } else if (stringFromInput.startsWith('c')) {
      setState(makeList(cArr));
    } else if (stringFromInput.startsWith('d')) {
      setState(makeList(dArr));
    } else if (stringFromInput.startsWith('e')) {
      setState(makeList(eArr));
    } else if (stringFromInput.startsWith('f')) {
      setState(makeList(fArr));
    } else if (stringFromInput.startsWith('g')) {
      setState(makeList(gArr));
    } else if (stringFromInput.startsWith('h')) {
      setState(makeList(hArr));
    } else if (stringFromInput.startsWith('i')) {
      setState(makeList(iArr));
    } else if (stringFromInput.startsWith('j')) {
      setState(makeList(jArr));
    } else if (stringFromInput.startsWith('k')) {
      setState(makeList(kArr));
    } else if (stringFromInput.startsWith('l')) {
      setState(makeList(lArr));
    } else if (stringFromInput.startsWith('m')) {
      setState(makeList(mArr));
    } else if (stringFromInput.startsWith('n')) {
      setState(makeList(nArr));
    } else if (stringFromInput.startsWith('o')) {
      setState(makeList(oArr));
    } else if (stringFromInput.startsWith('p')) {
      setState(makeList(pArr));
    } else if (stringFromInput.startsWith('q')) {
      setState(makeList(qArr));
    } else if (stringFromInput.startsWith('r')) {
      setState(makeList(rArr));
    } else if (stringFromInput.startsWith('s')) {
      setState(makeList(sArr));
    } else if (stringFromInput.startsWith('t')) {
      setState(makeList(tArr));
    } else if (stringFromInput.startsWith('u')) {
      setState(makeList(uArr));
    } else if (stringFromInput.startsWith('v')) {
      setState(makeList(vArr));
    } else if (stringFromInput.startsWith('w')) {
      setState(makeList(wArr));
    } else if (stringFromInput.startsWith('x')) {
      setState(makeList(xArr));
    } else if (stringFromInput.startsWith('y')) {
      setState(makeList(yArr));
    } else if (stringFromInput.startsWith('z')) {
      setState(makeList(zArr));
    } else {
      setState(makeList(difArr));
    }
  }, [stringFromInput]);

  const handleClick = (index: number) => {
    dispatch(picData(state[index]));
  };

  if (state && stringFromInput.length !== 0) {
    return (
      <div className={styles.container}>
        {state.map((item: TOneWord, index: number) => (
          <Link
            className={styles.link}
            key={index}
            onClick={() => handleClick(index)}
            to='/gitTreiner/word'
            state={{ backgroundLocation: locationInTheApp }}
          >
            {`${item.targetWord} - ${item.translating}`}
          </Link>
        ))}
      </div>
    );
  } else {
    return (
      <>
        <div className={styles.container} />
      </>
    );
  }
};
export default SearchResults;
