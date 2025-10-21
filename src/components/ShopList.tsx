import { ShopTile } from "./ShopTile";
import { fetchShops, useQuery } from "../fetch";

export const ShopOveriew = () => {
  const shopData = useQuery({
    queryKey: "shops-list",
    queryFn: () => fetchShops(),
  });

  const shops = shopData.items;
  return (
    <div className="my-8">
      <h1 className="mb-8 text-black/90 text-xl font-bold">Shop Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shops.map((shop) => (
          <ShopTile key={shop.id} shop={shop} />
        ))}
      </div>
    </div>
  );
};
