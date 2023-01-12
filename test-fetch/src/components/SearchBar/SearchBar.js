import React, { useEffect, useState } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    // setTimeout(() => {
    //
    // }, 5000);
    // const newFilter = data.filter((value) => {
    //   return value.title.toLowerCase().includes(searchWord.toLowerCase());
    // });

    // if (searchWord === "") {
    //   setFilteredData([]);
    // } else {
    //   setFilteredData(newFilter);
    // }
  };
  console.log(wordEntered);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/search?query=${wordEntered}`)
      .then((response) => {
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [wordEntered]);

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  if (!filteredData) return null;
  console.log(filteredData);

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onKeyDown={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          ) : (
            <FontAwesomeIcon icon={faCircleXmark} onClick={clearInput} />
          )}
        </div>
      </div>
      {/* {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.map((value) => (
            <p>{value}</p>
          ))}
        </div> 
      )}*/}
    </div>
  );
}

export default SearchBar;
