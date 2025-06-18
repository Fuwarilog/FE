import axios from "axios";

 //country(통화 코드)를 기준으로 3개월 환율 데이터를 조회하는 함수
export const fetchExchangeRateChartData = async (country) => {
  const url = `http://localhost:8080/api/v1/exchange/rates/`;

  return await axios.get(url, {
    params: {
      country: country,
      today: "NOW",
    },
    withCredentials: true, 
  });
};
