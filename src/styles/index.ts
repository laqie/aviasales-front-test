import { Theme } from './theme';


type Callback = <T>(s: T) => T;

export const identity: Callback = t => t;

export const getThemePath = <T = string>(key: string, cb: Callback = identity) => {
  const keys = key.split('.');
  return ({ theme }: { theme: Theme }): T => {
    return cb(keys.reduce(
      (o: any, k) => o[k] || {},
      theme,
    ) || '');
  };
};
