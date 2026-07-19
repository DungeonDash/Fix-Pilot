export const customerKeys = {
  all: ["customers"] as const,

  list: (filters: {
    page: number;
    limit: number;
    search: string;
  }) =>
    [
      ...customerKeys.all,
      "list",
      filters,
    ] as const,
};

