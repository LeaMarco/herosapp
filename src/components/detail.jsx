import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { detailHero } from "../utils";
import axios from "axios";
import styles from "./detail.module.css";
import { Spinner } from "react-bootstrap";
import { addHero, removeHero } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";

export function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [detail, setDetail] = useState("");
  console.log(detail, "DETALLE");
  const detailHero = (id) => {
    axios
      .get(`https://www.superheroapi.com/api.php/10221366481211546/${id}`)
      .then((response) => setDetail(response));
  };

  let team = useSelector((state) => state.team);

  let teamIds = team.map((hero) => hero.id);
  let badHeros = team.filter(
    (hero) => hero.biography.alignment == "bad"
  ).length;
  let goodHeros = team.filter(
    (hero) => hero.biography.alignment == "good"
  ).length;

  useEffect(() => {
    detailHero(id);
    return () => {
      setDetail("");
    };
  }, []);

  return detail?.data?.name ? (
    <div className={styles.background}>
      <div className={styles.container}>
        <img src={detail.data.image.url} alt="" />
        <div className={styles.data}>
          <h1>{detail.data.name}</h1>
          <div className={styles.dataGroup}>
            <h4> Weight: {detail.data.appearance.weight[1]}</h4>
            <h4> Height: {detail.data.appearance.height[1]}</h4>
            <h4> Alias: {detail.data.biography.aliases[0]}</h4>
            <h4> Eye color: {detail.data.appearance["eye-color"]}</h4>
            <h4> Hair color: {detail.data.appearance["hair-color"]}</h4>
            <h4> Work base: {detail.data.work.base}</h4>
          </div>
          <h1>Power stats</h1>
          <div className={styles.powerstats}>
            <>
              <div>
                <p>intelligence: {detail.data.powerstats.intelligence}</p>
                <p>strength: {detail.data.powerstats.strength}</p>
                <p>speed: {detail.data.powerstats.speed}</p>
              </div>
              <div>
                <p>durability: {detail.data.powerstats.durability}</p>
                <p>power: {detail.data.powerstats.power}</p>
                <p>combat: {detail.data.powerstats.combat}</p>
              </div>
            </>
          </div>
          <p>aligment: {detail.data.biography.alignment}</p>

          {/* peso altura nombre alias color de ojos color de cabello lugar de trabajo */}
          {team?.length > 0 && teamIds.includes(detail.data.id) ? (
            <Button
              style={{ width: "50%", marginLeft: "20%" }}
              variant="primary"
              onClick={() => dispatch(removeHero(detail.data.id))}
            >
              Remove from team
            </Button>
          ) : ((detail.data.biography.alignment == "bad") & (badHeros < 3)) |
            ((detail.data.biography.alignment == "good") & (goodHeros < 3)) ? (
            <Button
              style={{ width: "50%", marginLeft: "20%" }}
              variant="primary"
              onClick={() => dispatch(addHero(detail.data))}
            >
              Add to team
            </Button>
          ) : (
            <p>you have enought {detail.data.biography.alignment} heroes</p>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.background}>
      <Spinner animation="border" variant="light"/>
    </div>
  );
}
