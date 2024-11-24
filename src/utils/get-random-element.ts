/**
 * функция получения рандомного элемента массива из переданного ей массива
 * @param arr массив
 * @returns рандомный элемент массиваа
 */
export function getRandomElement(arr: any) {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
}

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
