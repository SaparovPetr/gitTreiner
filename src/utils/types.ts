import { ReactElement, ReactNode } from 'react';

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

/** типизация инпута */
export type TOneInput = {
  keyInLocalStorage: string;
  lableContent: string;
};

/** типизация пропсов модалки */
export type TModalProps = {
  children?: ReactElement;
  closeModal: () => void;
};

/** типизация пропсов кнопки */
export type TButtonProps = {
  htmlType?: string;
  children: ReactNode;
  onClickFunc?: () => void;
  disabled?: boolean;
};

/** типизация пропсов модалки слова */
export type TWordModalContentProps = {
  closeModal?: () => void;
  linkToPublicFile: string;
  linkToRepo: string;
};

/** типизация пропсов модалки настроек */
export type TSettingModalContentProps = {
  closeModal?: () => void;
};
