import { ReactElement, ReactNode } from 'react';

/** тип объекта одного слова */
export type TOneWord = {
  targetWord: string;
  translating: string;
  id: string;
};

/** виды режимов приложения (уровня изучаемых слов) */
export const enum AppMode {
  Dif = 'dif',
  ThreeK = '3K',
  A = 'A',
  B1 = 'B1',
  B2 = 'B2'
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
  children: ReactElement;
  closeModal: () => void;
};

/** типизация пропсов кнопки */
export type TButtonProps = {
  children: ReactNode;
  onClickFunc?: () => void;
  disabled: boolean;
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
