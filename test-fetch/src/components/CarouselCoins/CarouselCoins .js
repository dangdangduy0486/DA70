import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./CarouselCoins.css";
import Loading from "../../pages/Loading/Loading";
import { useGetTrendingCoinsQuery } from "../../features/coins/coinsApiSlice";

const CarouselCoins = () => {
  const [trendCoins, setTrendingCoins] = useState(null);
  // const url = "api/trending";
  // const token = localStorage.getItem("token");
  // const opts = {
  //   headers: {
  //     Authorization: token ? `Bearer ${token}` : "",
  //   },
  // };
  // useEffect(() => {
  //   axios
  //     .get(url, opts)
  //     .then((res) => {
  //       setTrendingCoins(res.data);
  //       carousel();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const { data, error, isLoading } = useGetTrendingCoinsQuery();

  if (!data || error || isLoading) return <Loading />;

  function carousel() {
    let carouselSlider = document.getElementsByClassName("carousel__slider");
    let list = document.getElementsByClassName("carousel__list");
    let item = document.getElementsByClassName("carousel__item");
    let list2;

    const speed = 1;

    const width = "100%";
    let x = 0;
    let x2 = width;

    function clone() {
      list2 = list.cloneNode(true);
      carouselSlider.appendChild(list2);
      list2.style.left = `${width}px`;
    }

    function moveFirst() {
      x -= speed;

      if (width >= Math.abs(x)) {
        list.style.left = `${x}px`;
      } else {
        x = width;
      }
    }

    function moveSecond() {
      x2 -= speed;

      if (list2.offsetWidth >= Math.abs(x2)) {
        list2.style.left = `${x2}px`;
      } else {
        x2 = width;
      }
    }

    function hover() {
      clearInterval(a);
      clearInterval(b);
    }

    function unhover() {
      a = setInterval(moveFirst, 10);
      b = setInterval(moveSecond, 10);
    }

    clone();

    let a = setInterval(moveFirst, 10);
    let b = setInterval(moveSecond, 10);

    carouselSlider.addEventListener("mouseenter", hover);
    carouselSlider.addEventListener("mouseleave", unhover);
  }

  return (
    <>
      <section className="slider">
        <div className="slide-track">
          {data.coins &&
            data.coins.map((coin, index) => (
              <div className="slide" key={index}>
                <span>
                  <img
                    src={coin.item.large}
                    alt="coin"
                    className="carouselImg"
                  />
                </span>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default CarouselCoins;
