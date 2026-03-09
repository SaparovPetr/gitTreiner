/** Состояния загрузки маркаун
 * @param Idle простаивает
 * @param Loading загружается
 * @param Success успешно загружено
 * @param Failed ошибка
 */
export const enum RequestStatus {
  Idle = 'Idle',
  Loading = 'Loading',
  Success = 'Success',
  Failed = 'Failed'
}

/** тип объекта одного слова */
export type TOneWord = {
  targetWord: string;
  translating: string;
  skyid?: string | null;
  id?: string;
  partOfSpeechCode?: string;
  audioURL?: string;
};

/** виды режимов приложения (уровня изучаемых слов и языка) */
export const enum AppMode {
  Dif = 'dif',
  ThreeK = '3K',
  A = 'A',
  B1 = 'B1',
  B2 = 'B2',
  Es400 = 'es400',
  Es500 = 'es500'
}

/** типизация пользователя */
export interface IUser {
  profileName: string;
  repoName: string;
  linkToPublicFile: string;
  linkToRepo: string;
}
