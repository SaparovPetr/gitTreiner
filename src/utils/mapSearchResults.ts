// убраться тут

export const mapSearchResults = (word: string, arr: any) => {
  const shortArr: any[] = [];
  arr.map((item: { targetWord: string }) => {
    if (item.targetWord?.startsWith(word)) {
      shortArr.push(item);
    }
    return shortArr;
  });
  shortArr.sort((a, b) => {
    if (a.targetWord > b.targetWord) {
      return 1;
    } else {
      return -1;
    }
  });
  return shortArr;
};
