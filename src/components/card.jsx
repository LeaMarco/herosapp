import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { addHero, removeHero } from "../actions";
import { useDispatch, useSelector } from "react-redux";

const HeroCard = ({ data }) => {
  const dispatch = useDispatch();
  let team = useSelector((state) => state.team);
  let teamIds= team.map(hero => hero.id)
  let badHeros = team.filter(hero=> hero.biography.alignment == "bad").length
  let goodHeros = team.filter(hero=> hero.biography.alignment == "good").length


  return (
    <Card style={{ width: "20rem" }}>
      <Card.Img variant="top" src={data.data.image.url} />
      <Card.Body>
        <Card.Title>{data.data.name}</Card.Title>
        <Card.Text>
          <div>
            <p>intelligence: {data.data.powerstats.intelligence}</p>
            <p>strength: {data.data.powerstats.strength}</p>
            <p>speed: {data.data.powerstats.speed}</p>
            <p>durability: {data.data.powerstats.durability}</p>
            <p>power: {data.data.powerstats.power}</p>
            <p>combat: {data.data.powerstats.combat}</p>
            <p>aligment: {data.data.biography.alignment}</p>
          </div>
        </Card.Text>
        <Button variant="primary" onClick={() => console.log("see details")}>
          View Details
        </Button>
        {team?.length>0 && teamIds.includes(data.data.id) ? (
          <Button
            variant="primary"
            onClick={() => dispatch(removeHero(data.data.id))}
          >
            Remove from team
          </Button>
        ) : data.data.biography.alignment == "bad" & badHeros<3 | data.data.biography.alignment == "good" & goodHeros<3 ?(
          <Button
            variant="primary"
            onClick={() => dispatch(addHero(data.data))}
          >
            Add to team
          </Button>
        ): <p>you have enought {data.data.biography.alignment} heroes</p>}
      </Card.Body>
    </Card>
  );
};

export default HeroCard;
