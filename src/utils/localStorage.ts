export const setLocal = (key: string, value: any) => {
  if (typeof value === "string") {
    window.localStorage.setItem(key, value);
  } else {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getLocal = (key: string) => {
  const data = window.localStorage.getItem(key);
  // console.log(key, data)
  return data;
};

export const removeLocal = (key: string) => {
  window.localStorage.removeItem(key);
};

export const ClearLocal = () => {
  window.localStorage.clear();
};
