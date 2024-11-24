import { currientDate } from './currient-date';

/**
 * Колбек для кнопки "продолжить" на экране приветствия
 */
export const markTheFirstStart = () => {
  // (заметка № 16)
  localStorage.setItem('firstStart', `${currientDate}`);
  location.reload();
};

/**
 * установка значения в хранилще
 */
export const setEntryInLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

/**
 * получение из localStorage текущего режима
 */
export const currientModeFromLocalStorage =
  localStorage.getItem(`currientMode`);

/**
 * получение из localStorage данных о количестве подходов за сегодня
 */
export const counterFromLocalStorage = localStorage.getItem(
  `effortCounterInStorage-${currientDate}`
);

/**
 * получение из localStorage сведений о демонстранции эрана приветствия
 */
export const isFirstStart = localStorage.getItem('firstStart');
