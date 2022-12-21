type AssocObj<K extends string, V, O extends object> = Pick<
  O,
  Exclude<keyof O, K>
> &
  Record<K, V>;

export { type AssocObj as default };
