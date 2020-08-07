import React from "react";
import Pokemon from "../Pokemon/Pokemon";
import classes from "./Pokemons.module.css";

const Pokemons = ({ pokemons }) => {
  return (
    <div className={classes.Pokemons}>
      <div className={classes.Pokemon__items}>
        {pokemons.map(name => (
          <Pokemon name={name} key={name} />
        ))}
      </div>
    </div>
  );
};

export default Pokemons;
