const date = new Date();
export const currientDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;

export const counterFromLocalStorage = localStorage.getItem(
  `effortCounterInStorage-${currientDate}`
);
