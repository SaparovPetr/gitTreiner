import { firstWordBase } from '../word-bases/first-word-base';
import { secondWordBase } from '../word-bases/second-word-base';

/**
 * функция получения базы слов, сответствующей текущему режиму
 * @param str режим приложения
 * @returns база слов (массив), соответствующая режиму приложения
 */
export const getCurrientBase = (mode: string | null) => {
  if (mode === 'L') {
    return firstWordBase;
  } else if (mode === 'S') {
    return secondWordBase;
  }
};
