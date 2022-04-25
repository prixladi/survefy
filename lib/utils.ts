export const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const getIntOrDefault = (str: string | undefined, def: number) => {
  const val = str ? parseInt(str, 10) : undefined;
  return !val || Number.isNaN(val) ? def : val;
};

type UnionFromTuple<T> = T extends (infer U)[] ? U : never;
export const Enum = <T extends string[]>(...args: T) => {
  return Object.freeze(
    args.reduce((acc, next) => {
      return {
        ...acc,
        [next]: next,
      };
    }, Object.create(null)) as { [P in UnionFromTuple<typeof args>]: P },
  );
};
