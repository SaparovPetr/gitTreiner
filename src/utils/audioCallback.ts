import { TOneWord } from '@utils-types';

export const audioCallback = (array: TOneWord[]) => {
  const audioObj = new Audio(
    `https://vimbox-tts.skyeng.ru/api/v1/tts?text=${array[0].targetWord}&lang=en&voice=male_2`
  );
  audioObj.play();
};
