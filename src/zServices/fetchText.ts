/** примет имя файла и вернет текст */
export const fetchText = async (file: string) => {
  try {
    const response = await fetch(file);
    const text = await response.text();
    return text;
  } catch (err) {
    throw new Error();
  }
};
