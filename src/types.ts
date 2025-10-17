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
  categories: {
    id: string;
    name: string;
  }[];
  tags: string[];
  vouchers: [];
  minimumCashback: number;
  minimumCashbackType: "€";
  maximumCashback: number;
  maximumCashbackType: "€";
  isFavorite: boolean;
  cashbackRates: {
    amount: number;
    type: "€" | "%";
    description: string;
  }[];
  isExtensionVisible: boolean;
  urlMatches: string[];
  link: string;
  logo: string;
  similarShops?: Shop[];
};
