import { Heart } from "lucide-react";
import type { Shop } from "../types";
import { useNavigate } from "react-router";

interface ShopTileProps {
  shop: Shop;
}

export const ShopTile = ({ shop }: ShopTileProps) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white/90 border border-black/10 rounded-md">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-24 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
            <img
              src={shop.logo}
              alt={`${shop.name} logo`}
              className="w-full h-full object-contain text-black/80 text-sm flex items-center justify-center"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="truncate text-black/95 text-md font-medium">
                {shop.name}
              </h3>
              {shop.isFavorite && (
                <Heart className="w-5 h-5 fill-red-500 text-red-500 flex-shrink-0" />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 pt-0">
        <button
          onClick={() => navigate(`/shop/${shop.id}`)}
          className="w-full bg-black/80 text-white/90 px-3 py-2 rounded-md hover:bg-black/90 transition-colors duration-300"
        >
          Show Details
        </button>
      </div>
    </div>
  );
};
