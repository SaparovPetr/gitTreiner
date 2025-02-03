import { ChangeEvent, ChangeEventHandler, useState } from 'react';

import { mapSearchResults } from '@utils/mapSearchResults';

// import styles from './search.module.css';
// import { aArr } from '../../word-bases/aArr';

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

const SearchResults = ({ targetWord }: any) => {
  const clickHandler = () => {
    if (targetWord.startsWith('a')) {
      console.log(mapSearchResults(targetWord, aArr));
    } else if (targetWord.startsWith('b')) {
      console.log(mapSearchResults(targetWord, bArr));
    } else if (targetWord.startsWith('c')) {
      console.log(mapSearchResults(targetWord, cArr));
    } else if (targetWord.startsWith('d')) {
      console.log(mapSearchResults(targetWord, dArr));
    } else if (targetWord.startsWith('e')) {
      console.log(mapSearchResults(targetWord, eArr));
    } else if (targetWord.startsWith('f')) {
      console.log(mapSearchResults(targetWord, fArr));
    } else if (targetWord.startsWith('g')) {
      console.log(mapSearchResults(targetWord, gArr));
    } else if (targetWord.startsWith('h')) {
      console.log(mapSearchResults(targetWord, hArr));
    } else if (targetWord.startsWith('i')) {
      console.log(mapSearchResults(targetWord, iArr));
    } else if (targetWord.startsWith('j')) {
      console.log(mapSearchResults(targetWord, jArr));
    } else if (targetWord.startsWith('k')) {
      console.log(mapSearchResults(targetWord, kArr));
    } else if (targetWord.startsWith('l')) {
      console.log(mapSearchResults(targetWord, lArr));
    } else if (targetWord.startsWith('m')) {
      console.log(mapSearchResults(targetWord, mArr));
    } else if (targetWord.startsWith('n')) {
      console.log(mapSearchResults(targetWord, nArr));
    } else if (targetWord.startsWith('o')) {
      console.log(mapSearchResults(targetWord, oArr));
    } else if (targetWord.startsWith('p')) {
      console.log(mapSearchResults(targetWord, pArr));
    } else if (targetWord.startsWith('q')) {
      console.log(mapSearchResults(targetWord, qArr));
    } else if (targetWord.startsWith('r')) {
      console.log(mapSearchResults(targetWord, rArr));
    } else if (targetWord.startsWith('s')) {
      console.log(mapSearchResults(targetWord, sArr));
    } else if (targetWord.startsWith('t')) {
      console.log(mapSearchResults(targetWord, tArr));
    } else if (targetWord.startsWith('u')) {
      console.log(mapSearchResults(targetWord, uArr));
    } else if (targetWord.startsWith('v')) {
      console.log(mapSearchResults(targetWord, vArr));
    } else if (targetWord.startsWith('w')) {
      console.log(mapSearchResults(targetWord, wArr));
    } else if (targetWord.startsWith('x')) {
      console.log(mapSearchResults(targetWord, xArr));
    } else if (targetWord.startsWith('y')) {
      console.log(mapSearchResults(targetWord, yArr));
    } else if (targetWord.startsWith('z')) {
      console.log(mapSearchResults(targetWord, zArr));
    } else {
      console.log(mapSearchResults(targetWord, difArr));
    }
  };

  return (
    <>
      <div onClick={clickHandler}>{'sdfg'}</div>
    </>
  );
};
export default SearchResults;
