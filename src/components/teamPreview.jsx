import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import styles from "./home.module.css";
import { useDispatch, useSelector } from "react-redux";


import { getHero } from "../actions";
import HeroCard from "./card";
// import { findHeros } from "../actions";

const TeamPreview = () => {
  let team = useSelector((state) => state.team);
  console.log(team, "buscadoss")
  
  
  let teamStats= team.length>0 ? [
      {intelligence: team.map(hero => +hero.powerstats.intelligence).reduce((a,b)=>a+(b="null"?0:b))},
      {strength: team.map(hero => +hero.powerstats.strength).reduce((a,b)=>a+(b="null"?0:b))},
      {speed: team.map(hero => +hero.powerstats.speed).reduce((a,b)=>a+(b="null"?0:b))},
      {durability: team.map(hero => +hero.powerstats.durability).reduce((a,b)=>a+(b="null"?0:b))},
      {power: team.map(hero => +hero.powerstats.power).reduce((a,b)=>a+(b="null"?0:b))},
      {combat: team.map(hero => +hero.powerstats.combat).reduce((a,b)=>a+(b="null"?0:b))},
  ] : null

console.log(teamStats, "teamstats")

  return (
      <>
      { team.length ? 
        <div>
        <h1>Team</h1>
        {
            // teamStats.sort().map(stat=> <p>{JSON.stringify(stat).replace(/['"]|[{]|[}]+/g,'')}</p>)
            teamStats.sort((a,b)=>(Object.values(b)-Object.values(a))).map(stat=> <p>{Object.keys(stat)}: {Object.values(stat)}</p>)

        }

      </div> :
      <h5>your team is empty</h5>
    }
    </>
  );
};

export default TeamPreview;
