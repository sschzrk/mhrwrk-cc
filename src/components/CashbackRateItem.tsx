import type { CashbackRate } from "../types";

interface CashbackRateItemProps {
  rate: CashbackRate;
}

export const CashbackRateItem = ({ rate }: CashbackRateItemProps) => {
  return (
    <div className="flex flex-col items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
      <div className="mb-2">
        <span className="font-semibold text-green-900 text-lg">
          {rate.amount.toLocaleString("de-DE", {
            minimumFractionDigits: 2,
          })}{" "}
          {rate.type}
        </span>
      </div>
      <span className="text-gray-700">{rate.description}</span>
    </div>
  );
};
