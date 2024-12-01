import { TOneWord } from '@utils-types';

import { copyTextToClipboard } from './copy-text-to-clipboard';

/** Проверка статуса бота - на наличие бота в сети */
export const checkBotStatus = (onlineCase: void, offlineCase: void) => {
  fetch(`${localStorage.getItem(`linkToBot`)}/status`, {
    method: 'GET'
  })
    .then((res) => {
      if (res.ok) {
        console.log(`сервер на связи`);
        onlineCase;
      }
    })
    .catch((err) => {
      console.log(`Ошибка связи: ${err}`);
      offlineCase;
    });
};

/** Отправка на сервер словосочетания, из которого тот соберет промпт и передаст его модели*/
export const knockToAI = (
  loadingInProcess: void,
  loadingIsStoped: void,
  firstWordFromCollection: TOneWord
) => {
  loadingInProcess;
  fetch(`${localStorage.getItem(`linkToBot`)}/predict`, {
    method: 'POST',
    body: JSON.stringify({
      message: `${firstWordFromCollection.targetWord} - ${firstWordFromCollection.translating}`
    }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'no-cors'
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })

    .then((data) => {
      loadingIsStoped;
      copyTextToClipboard(data.result);
      return data;
    })

    .catch((err) => {
      console.log(`Ошибка генерации: ${err}`);
    })

    .finally(() => {
      loadingIsStoped;
    });
};
