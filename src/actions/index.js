import { ADD_HERO, FIND_HERO, REMOVE_HERO, GET_HERO } from "./actionNames";
import axios from "axios";

export function findHero(type, pageNumber) {
  let ids = [Math.floor(Math.random() * 731)];
  return (dispatch) => {
    axios
      .post(
        `https://www.superheroapi.com/api.php/${process.env.REACT_APP_HOST_BACKEND}/${ids}`
      )
      .then((response) => {
        dispatch({ type: FIND_HERO, payload: response.data });
      });
  };
}

export function getHero(amount) {
  let heros = [];
  return async (dispatch) => {
    for (let i = 0; i < amount; i++) {
      await axios
        .get(
          // `https://www.superheroapi.com/api.php/${process.env.API_KEY}/${ids}`
          `https://www.superheroapi.com/api.php/10221366481211546/${Math.floor(
            Math.random() * 731
          )}`
        )
        .then((response) => {
          heros.push(response);
        })}
        
          dispatch({
            type: GET_HERO,
            payload: heros,
          });
        
    }
  };


export function addHero(payload) {
  return {
    type: ADD_HERO,
    payload,
  };
}

export function removeHero(payload) {
  return {
    type: REMOVE_HERO,
    payload,
  };
}
