export type Shop = {
  id: string;
  active: string;
  top: string;
  name: string;
  createdAt: string;
  createdAtTimestamp: number;
  updatedAt: string;
  updatedAtTimestamp: number;
  complainable: boolean;
  popularity: number;
  description: string;
  important: string;
  categories: Category[];
  tags: unknown[];
  vouchers: unknown[];
  minimumCashback: number;
  minimumCashbackType: "€";
  maximumCashback: number;
  maximumCashbackType: "€";
  isFavorite: boolean;
  cashbackRates: CashbackRate[];
  isExtensionVisible: boolean;
  urlMatches: string[];
  link: string;
  logo: string;
  similarShops?: Shop[];
};

export type CashbackRate = {
  amount: number;
  type: "€" | "%";
  description: string;
};

export type Category = {
  id: string;
  name: string;
};
