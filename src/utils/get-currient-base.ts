import { firstWordBase } from '../word-bases/first-word-base';
import { secondWordBase } from '../word-bases/second-word-base';

export const getCurrientBase = (str: string | null) => {
  if (str === 'L') {
    return firstWordBase;
  } else if (str === 'S') {
    return secondWordBase;
  }
};
