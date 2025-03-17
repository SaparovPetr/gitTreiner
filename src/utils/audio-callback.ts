/** воспроизведение аудио из публичного api SkyEng */

export const audioCallback = (link: string | undefined) => {
  const audioObj = new Audio(link);
  audioObj.play();
};
