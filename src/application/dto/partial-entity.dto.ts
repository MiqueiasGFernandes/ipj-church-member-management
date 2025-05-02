export type PartialEntity<T> = {
  [K in keyof T]?: T[K] | null;
}