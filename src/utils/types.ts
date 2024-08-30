/** тип объекта одного слова */
export type TOneWord = {
  targetWord: string;
  translating: string;
  id: string;
};

/** виды режимов приложения (уровня изучаемых слов) */
export const enum AppMode {
  Large = 'L',
  Small = 'S'
}
