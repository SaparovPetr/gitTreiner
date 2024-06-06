export function getRandomElement(arr: any[]) {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
}
