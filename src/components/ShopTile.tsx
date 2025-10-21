import { ArrowRight, Heart, Tag } from "lucide-react";
import { useNavigate } from "react-router";
import type { Shop } from "../types";

interface ShopTileProps {
  shop: Shop;
}

export const ShopTile = ({ shop }: ShopTileProps) => {
  const navigate = useNavigate();
  const topCashbackRate = shop.cashbackRates.find(
    (rate) =>
      rate.amount === Math.max(...shop.cashbackRates.map((rate) => rate.amount))
  );

  return (
    <button
      onClick={() => navigate(`/shop/${shop.id}`, { viewTransition: false })}
      className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer relative bg-white/75 border border-black/10 rounded-lg block text-black/60"
    >
      {/* Favorite Badge */}
      {shop.isFavorite && (
        <div className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md">
          <Heart className="w-4 h-4 fill-red-500 text-red-500" />
        </div>
      )}

      <div className="p-0">
        {/* Logo Section with Gradient Background */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 flex items-center justify-center">
          <div className="w-28 h-20 rounded-2xl overflow-hidden bg-white shadow-sm">
            <img
              src={shop.logo}
              alt={`${shop.name} logo`}
              className="w-full h-full p-2 object-contain flex justify-center items-center"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Shop Name */}
          <h3 className="text-center text-lg font-bold text-black/95">
            {shop.name}
          </h3>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {shop.categories.slice(0, 2).map((category, index) => (
              <div
                key={index}
                className="text-xs bg-black/5 px-2 py-1 rounded-md"
              >
                {category.name}
              </div>
            ))}
            {shop.categories.length > 2 && (
              <div className="text-xs">+{shop.categories.length - 2}</div>
            )}
            {shop.categories.length === 0 && (
              <div className="text-xs px-2 py-1">Keine Kategorien</div>
            )}
          </div>

          {/* Featured Cashback Rate */}
          {topCashbackRate ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Cashback bis zu</span>
              </div>
              <span className="text-green-700">
                {topCashbackRate.amount} {topCashbackRate.type}
              </span>
            </div>
          ) : (
            <div className="h-[50px] text-center text-sm text-black/50 p-3 border border-transparent">
              Keine Cashback-Raten verfügbar
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={() =>
              navigate(`/shop/${shop.id}`, { viewTransition: false })
            }
            className="w-full group-hover:bg-primary/90 transition-colors flex items-center justify-center bg-white text-black/95 py-2 rounded-md border border-black/10"
          >
            Details ansehen
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </button>
  );
};
