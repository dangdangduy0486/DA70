import React from "react";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

import "./Search.css";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (key) => {
    axios
      .get(`https://api.coingecko.com/api/v3/search?query=${key}`)
      .then((response) => {
        console.log(response.data.coins);
        setSearchResults(response.data.coins);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchResultsList = () => {
    const list = document.getElementById("list-group");
    if (list.style.display === "none") {
      list.style.display = "block";
    } else {
      list.style.display = "none";
    }
  };

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    console.log(searchWord);
    // setWordEntered(searchWord);
    // const newFilter = data.filter((value) => {
    //   return value.title.toLowerCase().includes(searchWord.toLowerCase());
    // });

    // if (searchWord === "") {
    //   setFilteredData([]);
    // } else {
    //   setFilteredData(searchWord);
    // }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  return (
    <>
      {/* <div>
        <input
          className="me-2"
          type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={(event) => handleSearch(event.target.value)}
          onFocus={searchResultsList}
        />
      </div> */}
      {/* <div>
        <ul className="list-group" id="list-group" style={{ display: "none" }}>
          {searchResults &&
            searchResults.map((s) => (
              <li className="list-group-item">{s.name}</li>
            ))}
        </ul>
      </div> */}
      <div className="search">
        <div className="searchInputs">
          <input
            type="text"
            placeholder={"Search"}
            value={wordEntered}
            onChange={handleFilter}
            id="searchInput"
          />
          <div className="searchIcon">
            {filteredData.length === 0 ? (
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            ) : (
              <FontAwesomeIcon
                icon={faXmark}
                id="clearBtn"
                onClick={clearInput}
              />
            )}
          </div>
        </div>
        {searchResults.length !== 0 && (
          <div className="dataResult">
            {searchResults.map((value, key) => (
              <a className="dataItem" href={value.link} target="">
                <p>{value.title} </p>
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
