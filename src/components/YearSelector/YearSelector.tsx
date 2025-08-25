import React from "react";

interface YearSelectorProps {
  onSelectYear: (year: number) => void;
  selectedYear: number;
}

export const YearSelector: React.FC<YearSelectorProps> = ({
  onSelectYear,
  selectedYear,
}) => {
  const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024];

  return (
    <div className="flex overflow-x-auto py-2">
      {years.map((year) => (
        <button
          key={year}
          onClick={() => onSelectYear(year)}
          className={`flex-1 mx-1 py-2 px-4 text-lg font-bold transition-colors duration-300
                        ${
                          selectedYear === year
                            ? "bg-[#FF3A3A] text-white"
                            : "bg-transparent text-[#6d6c6c] hover:bg-[#f0f0f0]"
                        }`}
        >
          {year}
        </button>
      ))}
    </div>
  );
};
