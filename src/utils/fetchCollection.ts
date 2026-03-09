import { getRandomElement } from '@utils/getRandomElement';

/**
 * функция, принимающая базу и возвращающая коллекцию
 */
// (заметка № 3)
export function fetchCollection(currientBase: any) {
  const collection = [];
  for (let i = 0; i <= 9; i = i + 1) {
    const randomElement = getRandomElement(currientBase);
    collection.push(randomElement);
  }
  return collection;
}
