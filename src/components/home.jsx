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
  const dispatch = useDispatch();
  let heros = useSelector((state) => state.search);

  const [search, setSearch] = useState("");
  const [amount, setAmount] = useState(12);
  const [isOpen, setOpen] = useState(false);
  const [actualSearch, setActualSearch] = useState("");

  useEffect(() => {
    dispatch(getHero(amount));
    return () => {
      setActualSearch("");
      dispatch(clearHero());
    };
  }, [amount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(findHero(search));
    setTimeout(() => {
      setActualSearch(search);
    }, 1500);
    setOpen(false);
  };

  const onSearchChange = ({ target }) => {
    setSearch(target.value);
  };

  const deleteSearch = () => {
    dispatch(clearHero());
    dispatch(getHero(amount));
    setActualSearch("");
    setOpen(false);
  };

  return (
    <div className={styles.container}>
      <TeamPreview />
      <div className={styles.filters}>
        {actualSearch.length ? (
          <div
            onClick={() => deleteSearch()}
            style={{ cursor: "pointer" }}
            className={styles.deleteSearch}
          >
            <h3 className={styles.deleteSearchConst}> Delete search: </h3>
            <h3 className={styles.deleteSearchVariable}> {actualSearch}</h3>
            <h3 className={styles.deleteSearchIcon}> x</h3>
          </div>
        ) : (
          <form className={styles.search} onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              placeholder="search hero by name"
              value={search}
              onChange={onSearchChange}
            />
            <button type="submit">Search</button>
          </form>
        )}
        <div>
          <div className={styles.amountButton} onClick={() => setOpen(!isOpen)}>
            <div>Amount: {amount}</div>
            <div className={styles.arrowContainer}>
              <div className={isOpen ? styles.arrowClose : styles.arrow} />
              <div
                className={isOpen ? styles.arrow : styles.arrowClose}
                style={{ marginLeft: "-3px" }}
              />
            </div>
          </div>
          <div
            className={styles.amountSelect}
            style={isOpen ? { position: "absolute" } : { display: "none"}}
          >
            <p onClick={() => setAmount(12)}>12</p>
            <p onClick={() => setAmount(24)}>24</p>
            <p onClick={() => setAmount(48)}>48</p>
          </div>
        </div>
      </div>
      <div className={styles.contenedor}>
        {heros?.length ? (
          heros.map((hero) => <HeroCard data={hero} key={hero.data.id} />)
        ) : (
          <Spinner animation="border" variant="light"/>
        )}
      </div>
    </div>
  );
};

export default Home;
