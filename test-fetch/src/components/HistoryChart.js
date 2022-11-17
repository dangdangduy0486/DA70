import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { useEffect, useState } from "react";
import Loading from "../pages/loading/loading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const HistoryChart = (coinID) => {
  const [chartValue, setChartValue] = useState(null);
  const url = `https://api.coingecko.com/api/v3/coins/${coinID.coinID}/market_chart?vs_currency=usd&days=7`;
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setChartValue(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  if (!chartValue) {
    return <Loading />;
  }

  const coinChartData = chartValue.prices.map((value) => ({
    x: value[0],
    y: value[1].toFixed(2),
  }));

  const options = {
    responsive: true,
  };
  const data = {
    labels: coinChartData.map((value) => moment(value.x).format("MMM DD")),
    datasets: [
      {
        fill: true,
        label: coinID.coinID,
        data: coinChartData.map((val) => val.y),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="history">
      <Line options={options} data={data} />
    </div>
  );
};
export default HistoryChart;
