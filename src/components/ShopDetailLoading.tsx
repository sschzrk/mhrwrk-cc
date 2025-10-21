import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export const ShopDetailLoading = () => {
  return (
    <div className="min-h-screen rounded-lg my-8">
      <div className="">
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
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 animate-pulse"></div>
              <div className="flex-1">
                <h2 className="mb-2 text-black text-2xl font-bold animate-pulse bg-gray-200 h-[28px] rounded-md"></h2>
                <div className="w-full">
                  <p className="text-black/60 animate-pulse bg-gray-200 h-[100px] rounded-lg"></p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-black/90">Kategorien</h3>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    className="text-black/60 text-sm p-2 rounded-lg animate-pulse bg-gray-200 h-[24px] w-32"
                  ></div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-black/90">Cashback-Raten</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-[100px] w-full bg-gray-200 rounded-lg animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
