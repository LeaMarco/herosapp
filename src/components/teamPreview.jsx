import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TeamCard from "./teamCard";
import styles from "./teamPreview.module.css";

import { getHero } from "../actions";
import HeroCard from "./card";
// import { findHeros } from "../actions";

const TeamPreview = () => {
  let team = useSelector((state) => state.team);

  const totalStat = (stat) =>
    team
      .map((hero) =>
        hero.powerstats[stat] === "null" ? 0 : +hero.powerstats[stat]
      )
      .reduce((a, b) => a + b);

  let averageWeight =
    team?.length > 0
      ? team
          .map((hero) => +hero.appearance.weight[1].split(" ")[0])
          .reduce((a, b) => a + b, 0) / team.length
      : 0;
  let averageHeight =
    team?.length > 0
      ? team
          .map((hero) => +hero.appearance.height[1].split(" ")[0])
          .reduce((a, b) => a + b, 0) / team.length
      : 0;
  let badHeros = team.filter(
    (hero) => hero.biography.alignment == "bad"
  ).length;
  let goodHeros = team.filter(
    (hero) => hero.biography.alignment == "good"
  ).length;

  let teamStats =
    team.length > 0
      ? [
          { intelligence: totalStat("intelligence") },
          { strength: totalStat("strength") },
          { speed: totalStat("speed") },
          { durability: totalStat("durability") },
          { power: totalStat("power") },
          { combat: totalStat("combat") },
        ]
      : null;

  return (
    <>
      {team.length ? (
        <div className={styles.teamContainer}>

          <div className={styles.teamTitle}>
            <h1>Team</h1>
            <h5>Bad heroes: {badHeros}</h5>
            <h5>Good heroes: {goodHeros}</h5>
          </div>
          <div className={styles.infoContainer}>
          <div className={styles.leftContainer}>
            <div>
              <h5>Avergae weight: {averageWeight}</h5>
              <h5>Avergae height: {averageHeight}</h5>
            </div>
            <div className={styles.powerstats}>
              {
                // teamStats.sort().map(stat=> <p>{JSON.stringify(stat).replace(/['"]|[{]|[}]+/g,'')}</p>)
                teamStats
                .sort((a, b) => Object.values(b) - Object.values(a))
                  .map((stat) => (
                    <p>
                      {Object.keys(stat)}: {Object.values(stat)}
                    </p>
                  ))
                }
            </div>
          </div>
          <div className={styles.rightContainer}>
            {team.map((hero) => (
              <TeamCard data={hero} />
              ))}
          </div>
        </div>
      </div>
      ) : (
        <h5>your team is empty</h5>
      )}
    </>
  );
};

export default TeamPreview;
