export type Rewrite<T, U> = Omit<T, keyof U> & U;

export type Timeout = ReturnType<typeof setTimeout> | null;
export interface windowStore {
  width: number;
  height: number;
  x: number;
  y: number;
}
