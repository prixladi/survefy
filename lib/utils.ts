export const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const getIntOrDefault = (str: string | undefined, def: number) => {
  const val = str ? parseInt(str, 10) : undefined;
  return !val || Number.isNaN(val) ? def : val;
};
