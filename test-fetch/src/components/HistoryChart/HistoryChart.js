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
import Loading from "../../pages/Loading/Loading";

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
  const [days, setDays] = useState(7);

  const url = `https://api.coingecko.com/api/v3/coins/${coinID.coinID}/market_chart?vs_currency=usd&days=${days}`;
  const token = localStorage.getItem("token");
  const opts = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
  useEffect(() => {
    axios
      .get(url, opts)
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
  const handleChangeDays = (e) => {
    setDays(e.target.value);
  };

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
    <>
      <div
        class="btn-group"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <input
          type="radio"
          class="btn-check"
          name="7days"
          id="7days"
          autocomplete="off"
          onClick={handleChangeDays}
          value={7}
        />
        <label class="btn btn-outline-primary" for="7days">
          7d
        </label>

        <input
          type="radio"
          class="btn-check"
          name="14days"
          id="14days"
          autocomplete="off"
          onClick={handleChangeDays}
          value={14}
        />
        <label class="btn btn-outline-primary" for="14days">
          14d
        </label>

        <input
          type="radio"
          class="btn-check"
          name="30days"
          id="30days"
          autocomplete="off"
          onClick={handleChangeDays}
          value={30}
        />
        <label class="btn btn-outline-primary" for="30days">
          30d
        </label>

        <input
          type="radio"
          class="btn-check"
          name="90days"
          id="90days"
          autocomplete="off"
          onClick={handleChangeDays}
          value={90}
        />
        <label class="btn btn-outline-primary" for="90days">
          90d
        </label>

        <input
          type="radio"
          class="btn-check"
          name="180days"
          id="180days"
          autocomplete="off"
          onClick={handleChangeDays}
          value={180}
        />
        <label class="btn btn-outline-primary" for="180days">
          180d
        </label>

        <input
          type="radio"
          class="btn-check"
          name="maxdays"
          id="maxdays"
          autocomplete="off"
          onClick={handleChangeDays}
          value={"max"}
        />
        <label class="btn btn-outline-primary" for="maxdays">
          max
        </label>
      </div>
      <div className="history">
        <Line options={options} data={data} />
      </div>
    </>
  );
};
export default HistoryChart;
