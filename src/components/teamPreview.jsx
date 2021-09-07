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
  
  const totalStat= (stat) =>{
    console.log(team[0].powerstats[stat], "pruebaaa")
    return(
    team.map(hero => hero.powerstats[stat]==="null"?0:+hero.powerstats[stat]).reduce((a,b)=>a+b)
    )
  }

  let teamStats= team.length>0 ? [
      {intelligence: totalStat('intelligence') },
      {strength: totalStat('strength')},
      {speed: totalStat('speed')},
      {durability: totalStat('durability')},
      {power: totalStat('power')},
      {combat: totalStat('combat')},
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
