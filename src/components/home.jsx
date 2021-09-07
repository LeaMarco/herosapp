import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import styles from "./home.module.css";
import { useDispatch, useSelector } from "react-redux";


import { getHero } from "../actions";
import HeroCard from "./card";
import TeamPreview from "./teamPreview";
// import { findHeros } from "../actions";

const Home = () => {
  const dispatch = useDispatch()
  let team = useSelector((state) => state.team);
  let searched = useSelector((state) => state.search);
  console.log(searched, "buscadoss")
  const [heros, setHeros] = useState();
  const [search, setSearch] = useState("");
  const [amount, setAmount] = useState(6);
  useEffect(() => {
    dispatch(getHero(amount));
  }, []);

  // async function findHeros() {
  //   let heros = [];
  //   for (let i = 0; i < amount; i++) {
  //     await axios
  //       .get(
  //         // `https://www.superheroapi.com/api.php/${process.env.API_KEY}/${ids}`
  //         `https://www.superheroapi.com/api.php/10221366481211546/${Math.floor(
  //           Math.random() * 731
  //         )}`
  //       )
  //       .then((response) => {
  //         heros.push(response);
  //       });
  //   }
  //   setHeros(heros);
  // }

  const handleSubmit = async (e) => {
    setHeros([]);
    e.preventDefault();
    let findHeros=[]
    await axios
      .get(
        // `https://www.superheroapi.com/api.php/${process.env.API_KEY}/${ids}`
        `https://www.superheroapi.com/api.php/10221366481211546/search/${search}`
      )
      .then((response) => {
        response.data.results.map((hero) => {
          axios
            .get(
              // `https://www.superheroapi.com/api.php/${process.env.API_KEY}/${ids}`
              `https://www.superheroapi.com/api.php/10221366481211546/${hero.id}`
            )
            .then((response) => findHeros.push(response));
        });
      });
    setHeros(findHeros);
    console.log(heros?.length, "HEROES length");
  };

  var onSearchChange = ({ target }) => {
    setSearch(target.value);
  };

  console.log(heros, "HEROES");

  return (
    <div>
      <TeamPreview/>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="search hero by name"
          value={search}
          onChange={onSearchChange}
        />
        <button type="submit">Search</button>
      </form>
      <div className={styles.contenedor}>
        {searched?.length ? (
          searched.map((hero) => <HeroCard data={hero} />)
        ) : (
          <Spinner animation="border" />
        )}
      </div>
    </div>
  );
};

export default Home;
