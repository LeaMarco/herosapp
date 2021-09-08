import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import styles from "./home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { clearHero, findHero, getHero } from "../actions";
import HeroCard from "./card";
import TeamPreview from "./teamPreview";
import { Link } from "react-router-dom";



const Home = () => {
  
  const dispatch = useDispatch()
  let heros = useSelector((state) => state.search);
  
  const [search, setSearch] = useState("");
  const [amount, setAmount] = useState(10);
  const [actualSearch, setActualSearch] = useState("");

  useEffect(() => {
    dispatch(getHero(amount));
    return () => {
      dispatch(clearHero());
    };
  }, [amount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(findHero(search))
    setTimeout(() => {
      setActualSearch(search)
    }, 1500); 
    
  };

  const onSearchChange = ({ target }) => {
    setSearch(target.value);
  };

  const deleteSearch = ()=>{
    dispatch(clearHero())
    dispatch(getHero(amount))
    setActualSearch("")
  }

  return (
    <div className={styles.container}>
      <TeamPreview/>
      {actualSearch.length?
      <h3 onClick={()=>deleteSearch()} style={{cursor:"pointer"}}> delete search:{actualSearch}</h3>
    : 
      <form className={styles.search}onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="search hero by name"
          value={search}
          onChange={onSearchChange}
        />
        <button type="submit">Search</button>
      </form>}
      <div className={styles.contenedor} >
        {heros?.length ? (
          heros.map(hero => <HeroCard data={hero} key={hero.data.id} />)
        ) : (
          <Spinner animation="border" />
        )}
      </div>
    </div>
  );
}; 

export default Home;
