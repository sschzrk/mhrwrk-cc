import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router";
import { fetchShopById, useQuery } from "../fetch";
import { CashbackRateItem } from "./CashbackRateItem";

const getShortPlainDescription = (description: string) => {
  const divElement = document.createElement("div");
  divElement.innerHTML = description;
  const text = divElement.textContent || divElement.innerText || "";
  return text.length > 140 ? text.slice(0, 140) + "…" : text;
};

export const ShopDetail = () => {
  const { id } = useParams();

  const shop = useQuery({
    queryKey: `shop-detail-${id}`,
    queryFn: () => fetchShopById(id),
    options: { staleTime: 600 * 1000 },
  });

  return (
    <div className="min-h-screen rounded-lg my-8">
      <div className="text-black">
        <Link
          to="/"
          className="mb-6 flex items-center hover:text-black transition-colors duration-300 px-0 py-2 text-black/60"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück zur Übersicht
        </Link>

        <div className="bg-white/90 p-6 border border-black/20 rounded-lg">
          <div className="mb-6">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                <img
                  src={shop.logo}
                  alt={`${shop.name} logo`}
                  className="w-full h-full object-contain flex items-center justify-center text-black/80 text-sm"
                />
              </div>
              <div className="flex-1">
                <h2 className="mb-2 text-black text-2xl font-bold">
                  {shop.name}
                </h2>
                <div className="w-full">
                  <p className="text-black/60">
                    {getShortPlainDescription(shop.description)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-black/90">Kategorien</h3>
              <div className="flex flex-wrap gap-2">
                {shop.categories.map((category, index) => (
                  <div
                    key={index}
                    className="text-black/60 text-sm border p-2 rounded-lg"
                  >
                    {category.name}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-black/90">Cashback-Raten</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {shop.cashbackRates.map((rate, index) => (
                  <CashbackRateItem key={index} rate={rate} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
