export type InfinityPaginationResultType<T> = Readonly<{
  data: T[];
  count: number;
}>;
