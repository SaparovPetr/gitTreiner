import { ChangeEvent, ChangeEventHandler, useState } from 'react';

import { mapSearchResults } from '@utils/mapSearchResults';

// import styles from './search.module.css';
// import { aArr } from '../../word-bases/aArr';

import { aArr } from '../../word-bases/myriad/aArr';
import { bArr } from '../../word-bases/myriad/bArr';
// import { cArr } from '../../word-bases/myriad/cArr';
// import { dArr } from '../../word-bases/myriad/dArr';
// import { difArr } from '../../word-bases/myriad/difArr';
// import { eArr } from '../../word-bases/myriad/eArr';
// import { fArr } from '../../word-bases/myriad/fArr';
// import { gArr } from '../../word-bases/myriad/gArr';
// import { hArr } from '../../word-bases/myriad/hArr';
// import { iArr } from '../../word-bases/myriad/iArr';
// import { jArr } from '../../word-bases/myriad/jArr';
// import { kArr } from '../../word-bases/myriad/kArr';
// import { lArr } from '../../word-bases/myriad/lArr';
// import { mArr } from '../../word-bases/myriad/mArr';
// import { nArr } from '../../word-bases/myriad/nArr';
// import { oArr } from '../../word-bases/myriad/oArr';
// import { pArr } from '../../word-bases/myriad/pArr';
// import { qArr } from '../../word-bases/myriad/qArr';
// import { rArr } from '../../word-bases/myriad/rArr';
// import { sArr } from '../../word-bases/myriad/sArr';
// import { tArr } from '../../word-bases/myriad/tArr';
// import { uArr } from '../../word-bases/myriad/uArr';
// import { vArr } from '../../word-bases/myriad/vArr';
// import { wArr } from '../../word-bases/myriad/wArr';
// import { xArr } from '../../word-bases/myriad/xArr';
// import { yArr } from '../../word-bases/myriad/yArr';
// import { zArr } from '../../word-bases/myriad/zArr';

const SearchResults = ({ targetWord }: any) => {
  const clickHandler = () => {
    if (targetWord.startsWith('a')) {
      console.log(mapSearchResults(targetWord, aArr));
    } else if (targetWord.startsWith('b')) {
      console.log(mapSearchResults(targetWord, bArr));
    }
  };

  return (
    <>
      <div onClick={clickHandler}>{'sdfg'}</div>
    </>
  );
};
export default SearchResults;
