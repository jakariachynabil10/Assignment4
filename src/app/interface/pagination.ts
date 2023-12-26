export type SortQuery = {
  $sort: {
    [key: string]: 1 | -1;
  };
};

export type PriceQuery = {
  $gte?: number;
  $lte?: number;
};

export type TagsQuery = {
  name: string;
};

export type DateQuery = {
  $eq?: string;
};
