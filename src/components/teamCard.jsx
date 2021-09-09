import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { addHero, removeHero } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./teamCard.module.css";

const TeamCard = ({ data }) => {
  const dispatch = useDispatch();
  let team = useSelector((state) => state.team);
  let search = useSelector((state) => state.search);

  let teamIds = team.map((hero) => hero.id);
  let badHeros = team.filter(
    (hero) => hero.biography.alignment == "bad"
  ).length;
  let goodHeros = team.filter(
    (hero) => hero.biography.alignment == "good"
  ).length;

  return (
    <Card className={styles.card}>
      <Link to={`/detail/${data.id}`}>
        <Card.Img variant="top" src={data.image.url} alt="Not image available"/>
      </Link>
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        {/* <Card.Text>
          <div>
            <p>intelligence: {data.powerstats.intelligence}</p>
            <p>strength: {data.powerstats.strength}</p>
            <p>speed: {data.powerstats.speed}</p>
            <p>durability: {data.powerstats.durability}</p>
            <p>power: {data.powerstats.power}</p>
            <p>combat: {data.powerstats.combat}</p>
            <p>aligment: {data.biography.alignment}</p>
          </div>
        </Card.Text> */}
        <Link to={`/detail/${data.id}`}>
          <Button variant="primary">Details</Button>
        </Link>

        {team?.length > 0 && teamIds.includes(data.id) ? (
          <Button
            variant="primary"
            onClick={() => dispatch(removeHero(data.id))}
          >
            Remove
          </Button>
        ) : ((data.biography.alignment == "bad") & (badHeros < 3)) |
          ((data.biography.alignment == "good") & (goodHeros < 3)) ? (
          <Button variant="primary" onClick={() => dispatch(addHero(data))}>
            Add to team
          </Button>
        ) : (
          <p>you have enought {data.biography.alignment} heroes</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default TeamCard;
