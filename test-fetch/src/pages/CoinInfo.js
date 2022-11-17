import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import axios from "axios";
import "../Css/CoinInfo.css";
import NavBar from "../components/NavBar";
import Loading from "./loading/loading";
import HistoryChart from "../components/HistoryChart";

const CoinInfo = () => {
  const [coinInfo, setCoinInfo] = useState("");
  const { coinID } = useParams("");
  const [isLoading, setIsLoading] = useState();
  const [isError, setIsError] = useState(false);

  const url = "/api/coins/";
  useEffect(() => {
    axios
      .get(url, {
        params: {
          id: coinID,
        },
      })
      .then((response) => {
        setCoinInfo(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, [coinID]);
  if (!coinInfo || isError || isLoading) return <Loading />;

  return (
    <>
      <NavBar />
      <hr />
      <section className="coininfor">
        <Container className=" history-chart">
          <HistoryChart coinID={coinID} />
        </Container>
        <hr />
        <Container fluid className="coindetail">
          <div className="">
            <div className="coindetail-title">
              <img src={coinInfo.image.small} alt={coinInfo.name} />
              <h1 className="text-2xl mb-2 capitalize font-bold">
                {coinInfo.name}
              </h1>
            </div>
            <p
              className="mt-6 text-gray-500 [&>a]:text-blue-600 [&>a]:underline"
              dangerouslySetInnerHTML={{ __html: coinInfo.description.en }}
            ></p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default CoinInfo;
