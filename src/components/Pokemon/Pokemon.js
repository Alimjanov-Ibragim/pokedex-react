import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import Popup from "reactjs-popup";

import "./Pokemon.css";

const Pokemon = ({ name }) => {
  const [pokemon, setPokemon] = useState([]);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then(response => {
      if (mounted) {
        setPokemon(response.data);
      }
    });
    return () => {
      setMounted(false);
    };
  }, [name, mounted, setMounted]);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div className={"Pokemon__col"}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={"Pokemon__item"}
      >
        <div className={"Pokemon__name"}>{pokemon.name}</div>
        <img
          src={
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
            pokemon.id +
            ".png"
          }
          className={"Pokemon__img"}
          alt={""}
        />
        <div className={"Pokemon__typesWr"}>
          <div className={"Pokemon__typesText"}>Type(s):</div>
          <div className={"Pokemon__types"}>
            {pokemon.types &&
              pokemon.types.map((type, index) => (
                <div className={"Pokemon__type"} key={index}>
                  {type.type.name}
                </div>
              ))}
          </div>
        </div>
        <button className={"Pokemon__more"} onClick={openModal}>
          More
        </button>
      </motion.div>
      <Popup
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
        className={"modalWr"}
      >
        <div className="pok-modal">
          <button className="close" onClick={closeModal}>
            &times;
          </button>
          <div className={"Pokemon__name"}>{pokemon.name}</div>
          <img
            src={
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
              pokemon.id +
              ".png"
            }
            className={["Pokemon__img", "Pokemon__imgModal"].join(" ")}
            alt={""}
          />
          <div className={"Pokemon__typesWr Pokemon__typesWrModal"}>
            <div className={"Pokemon__typesText"}>Type(s):</div>
            <div className={"Pokemon__types"}>
              {pokemon.types &&
                pokemon.types.map((type, index) => (
                  <div className={"Pokemon__type"} key={index}>
                    {type.type.name}
                  </div>
                ))}
            </div>
          </div>
          <div className={"Pokemon__typesWr Pokemon__typesWrModal"}>
            <div className={"Pokemon__typesText"}>Abilitie(s):</div>
            <div className={"Pokemon__types"}>
              {pokemon.abilities &&
                pokemon.abilities.map((ability, index) => (
                  <div className={"Pokemon__type"} key={index}>
                    {ability.ability.name}
                  </div>
                ))}
            </div>
          </div>
          <div className={"Pokemon__typesWr Pokemon__typesWrModal"}>
            <div className={"Pokemon__typesText"}>Height</div>
            <div className={"Pokemon__types"}>{pokemon.height}</div>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default Pokemon;
