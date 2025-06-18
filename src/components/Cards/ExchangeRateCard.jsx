"use client";

import { useEffect, useState } from "react";
import { Card, Title, LineChart, Text } from "@tremor/react";
import { fetchExchangeRateChartData } from "../../API/Exchange";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const currencies = [
  { label: "미국 달러 (USD)", code: "USD" },
  { label: "일본 엔화 (JPY)", code: "JPY" },
  { label: "중국 위안 (CNY)", code: "CNY" },
];

export default function ExchangeRateCard() {
  const [country, setCountry] = useState("USD");
  const [chartData, setChartData] = useState([]);
  const [percentChange, setPercentChange] = useState(null);
  const [currentRate, setCurrentRate] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetchExchangeRateChartData(country);
      const { dates, list_predictions, percentChange, currentRate } = res.data;

      const formatted = dates.map((date, idx) => ({
        date,
        rate: list_predictions[idx],
      }));

      setChartData(formatted);
      setPercentChange(percentChange);
      setCurrentRate(currentRate);
    };

    loadData();
  }, [country]);

  const getChangeIndicator = () => {
    if (percentChange === null) return "";
    if (percentChange > 0) return `▲${percentChange.toFixed(2)}%`;
    if (percentChange < 0) return `▼${Math.abs(percentChange).toFixed(2)}%`;
    return "변동 없음";
  };

  return (
    <Card className="w-full max-w-3xl shadow-md rounded-2xl">
      <div className="flex justify-between items-center">
        <Title className="text-lg font-semibold">
          최근 3개월 환율 추이 ({country})
        </Title>

        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Currency" />
          </SelectTrigger>
          <SelectContent>
            {currencies.map((item) => (
              <SelectItem key={item.code} value={item.code}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {currentRate !== null && (
        <Text className="mt-1 text-sm">
          현재 환율:{" "}
          <span className="font-semibold">{currentRate.toFixed(2)}</span>{" "}
          <span
            className={`ml-1 font-medium ${
              percentChange > 0
                ? "text-red-500"
                : percentChange < 0
                ? "text-green-500"
                : "text-gray-500"
            }`}
          >
            {getChangeIndicator()}
          </span>
        </Text>
      )}

      <LineChart
        className="mt-6 h-72"
        data={chartData}
        index="date"
        categories={["rate"]}
        colors={["indigo"]}
        yAxisWidth={60}
        showLegend={false}
        showAnimation={true}
        curveType="monotone"
      />
    </Card>
  );
}
