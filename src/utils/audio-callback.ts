/** воспроизведение аудио из публичного api SkyEng */
// export const audioCallback = (targetWord: string) => {
//   const audioObj = new Audio(
//     `https://vimbox-tts.skyeng.ru/api/v1/tts?text=${targetWord}&lang=en&voice=male_2`
//   );
//   audioObj.play();
// };

export const audioCallback = (link: string) => {
  const audioObj = new Audio(link);
  audioObj.play();
};
