import { useNavigate, useParams } from "react-router";
import { fetchShopById, useQuery } from "../fetch";
import { ArrowLeft } from "lucide-react";

const shopDescriptionNormalize = (description: string) => {
  const divElement = document.createElement("div");
  divElement.innerHTML = description;
  return divElement.textContent || divElement.innerText || "";
};

export const ShopDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const shop = useQuery({
    queryKey: `shop-${id}`,
    queryFn: () => fetchShopById(id),
    options: { staleTime: 600 * 1000 },
  });

  return (
    <div className="min-h-screen rounded-lg my-8">
      <div className="">
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center hover:text-black transition-colors duration-300 px-0 py-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück zur Übersicht
        </button>

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
                    {shopDescriptionNormalize(shop.description).slice(0, 140)}
                    {shopDescriptionNormalize(shop.description).length > 140 &&
                      "…"}
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

            {/* Cashback Rates */}
            <div>
              <h3 className="mb-3 text-black/90">Cashback-Raten</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {shop.cashbackRates.map((rate, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <div className="mb-2">
                      <span className="font-semibold text-green-700">
                        {rate.amount.toLocaleString("de-DE", {
                          minimumFractionDigits: 2,
                        })}{" "}
                        {rate.type}
                      </span>
                    </div>
                    <span className="text-gray-700">{rate.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
