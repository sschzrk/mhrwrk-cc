export const ShopOverviewLoading = () => {
  return (
    <div className="my-8">
      <h1 className="mb-8 text-black/90 text-xl font-bold">Shop Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ShopTileLoading key={index} />
        ))}
      </div>
    </div>
  );
};

const ShopTileLoading = () => {
  console.log("ShopTileLoading");
  return (
    <div className="group overflow-hidden transition-all duration-300 relative bg-white/75 border border-black/10 rounded-lg">
      <div className="p-0">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 flex items-center justify-center">
          <div className="w-28 h-20 rounded-2xl overflow-hidden bg-white shadow-sm animate-pulse"></div>
        </div>

        <div className="p-6 space-y-4">
          <h3 className="text-center text-lg font-bold text-black/95 animate-pulse bg-gray-200 h-[28px] rounded-md"></h3>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="h-[24px] w-32 rounded-md animate-pulse bg-gray-200"
              ></div>
            ))}
          </div>

          {/* Featured Cashback Rate */}
          <div className="w-full bg-gray-200 h-[50px] animate-pulse group-hover:bg-primary/90 transition-colors flex items-center justify-center text-black/95 py-2 rounded-md"></div>

          {/* Action Button */}
          <div className="w-full h-[42px] animate-pulse group-hover:bg-primary/90 transition-colors flex items-center justify-center text-black/95 py-2 rounded-md bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};
