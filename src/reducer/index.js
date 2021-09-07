import { ADD_HERO, REMOVE_HERO, GET_HERO } from "../actions/actionNames";

const initialState = { team: [], search: [] }; /////////////probar cambiar esto
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_HERO: {
      return {
        ...state,
        team: state.team.concat(action.payload),
      };
    }
    case REMOVE_HERO: {
      return {
        ...state,
        team: state.team.filter((hero) => hero.id !== action.payload),
      };
    }
    case GET_HERO: {
        console.log(action.payload, "payload reducer")
        return {
            ...state,
            search: action.payload
        }
    }

    default:
      return state;
  }
};
