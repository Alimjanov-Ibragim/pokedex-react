import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";

import Pagination from "./components/Pagination/Pagination";
import Pokemons from "./components/Pokemons/Pokemons";
import Loading from "./components/Loading/Loading";
import searchImg from "./assets/search.svg";
import orderByIcon from "./assets/sort.svg";
import "./App.css";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20&offset=200"
  );
  const [prev, setPrev] = useState();
  const [next, setNext] = useState();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [sortClicked, setSortClicked] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(page).then(response => {
      setLoading(false);
      setPokemons(response.data.results.map(pok => pok.name));
      setPrev(response.data.previous);
      setNext(response.data.next);
    });
  }, [page]);

  const goNextPage = () => {
    setPage(next);
  };

  const goPrevPage = () => {
    setPage(prev);
  };

  const searchHandler = () => {
    const clonedPokemons = pokemons.concat();
    const filtered = clonedPokemons.filter(
      pok => pok.toLowerCase() === search.toLowerCase()
    );
    if (search) {
      setPokemons(filtered);
    }
  };

  const onSort = () => {
    const clonedPokemons = pokemons.concat();
    const sortType = sort === "asc" ? "desc" : "asc";
    const orderedPokemons = _.orderBy(clonedPokemons, [], sortType);

    setPokemons(orderedPokemons);
    setSort(sortType);
    setSortClicked(true);
  };

  return (
    <div className="App">
      {loading ? (
        <Loading />
      ) : (
        <div className="App__inner">
          <h1>
            Pokedex &nbsp;
            <span role="img" aria-label="">
              🚀
            </span>
            <span role="img" aria-label="">
              🚀
            </span>
            <span role="img" aria-label="">
              🚀
            </span>
          </h1>
          <div className="App__search">
            <input
              type="text"
              value={search}
              onChange={event => setSearch(event.target.value)}
            />
            <button onClick={searchHandler}>
              <img src={searchImg} alt="" />
            </button>
          </div>
          <div className="App__sort">
            <button onClick={() => onSort()}>
              By Name{" "}
              {sortClicked ? (
                <img
                  className={
                    sort === "asc" ? "orderByIcon asc" : " orderByIcon desc"
                  }
                  src={orderByIcon}
                  alt=""
                />
              ) : null}
            </button>
          </div>
          <Pokemons pokemons={pokemons} />
          <Pagination goNextPage={goNextPage} goPrevPage={goPrevPage} />
        </div>
      )}
    </div>
  );
};

export default App;
