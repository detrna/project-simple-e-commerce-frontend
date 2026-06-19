export type ResponseSchema<T> = {
  data: T;
  meta: { message: string; pagination?: Pagination };
};

type Pagination = {
  limit: number;
  cursor: string | null;
  hasMore: boolean;
};
