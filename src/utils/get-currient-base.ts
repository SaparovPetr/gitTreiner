import { threeThousandWordBase } from '@word-bases/3k';
import { aWordBase } from '@word-bases/a';
import { bOneWordBase } from '@word-bases/b-one';
import { bTwoWordBase } from '@word-bases/b-two';
import { difWordBase } from '@word-bases/dif';
import { spanish400 } from '@word-bases/spanish400';
import { spanish500 } from '@word-bases/spanish500';

/**
 * функция получения базы слов, сответствующей текущему режиму
 * @param str режим приложения
 * @returns база слов (массив), соответствующая режиму приложения
 */
export const getCurrientBase = (mode: string | null) => {
  if (mode === 'dif') {
    return difWordBase;
  } else if (mode === '3K') {
    return threeThousandWordBase;
  } else if (mode === 'A') {
    return aWordBase;
  } else if (mode === 'B1') {
    return bOneWordBase;
  } else if (mode === 'B2') {
    return bTwoWordBase;
  } else if (mode === 'es400') {
    return spanish400;
  } else if (mode === 'es500') {
    return spanish500;
  }
};
