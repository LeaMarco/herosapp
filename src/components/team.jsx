import React from "react"
import { useSelector } from "react-redux";
import TeamCard from "./teamCard";

export const Team = () => {
    let heros = useSelector((state) => state.team);


    return heros?.length ? (
        <div>

        {heros.map(hero=> <TeamCard data={hero}/>)}
        </div>

    ):( <div> nou team</div> )
}