import { secondWordBase } from '../word-bases/secondWordBase';
import { myBase } from '../word-bases/wordBase';

export const getCurrientBase = (str: any) => {
  if (str === 'L') {
    return myBase;
  } else if (str === 'S') {
    return secondWordBase;
  }
};
