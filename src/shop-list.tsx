import { Heart } from "lucide-react";
import { fetchShops, useQuery } from "./fetch";
import type { Shop } from "./types";
import cn from "classnames";

export const ShopList = ({ token }: { token: string }) => {
  //   const token = useAuth((s) => s.token);

  const shopData = useQuery({
    queryKey: "shops",
    queryFn: () => fetchShops(token),
  });

  const shops = shopData.items;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {shops.map((shop) => (
        <ShopItem key={shop.id} shop={shop} />
      ))}
    </div>
  );
};

const ShopItem = ({ shop }: { shop: Shop }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-md space-y-2">
      <img src={shop.logo} alt={shop.name} className="w-auto h-24" />
      <div className="text-2xl font-bold">{shop.name}</div>
      <div className="flex items-center justify-center gap-2">
        <a
          href={`/shop/${shop.id}`}
          className="px-3 py-2 bg-black/30 rounded-md"
        >
          Mehr erfahren
        </a>
        <div>
          <Heart
            className={cn("w-4 h-4", {
              "fill-red-500": shop.isFavorite,
            })}
          />
        </div>
      </div>
    </div>
  );
};
