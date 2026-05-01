/** примет имя файла и вернет текст */
export const fetchText = async (fileUrl: string) => {
  try {
    const response = await fetch(fileUrl);
    const text = await response.text();
    return text;
  } catch (err) {
    throw new Error();
  }
};
