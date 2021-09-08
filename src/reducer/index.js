import {
  ADD_HERO,
  REMOVE_HERO,
  GET_HERO,
  FIND_HERO,
  CLEAR_HERO
} from "../actions/actionNames";

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
      return {
        ...state,
        search: action.payload,
      };
    }
    case FIND_HERO: {
      return {
        ...state,
        search: action.payload,
      };
    }
    case CLEAR_HERO: {
      return {
        ...state,
        search: [],
      };
    }
    default:
      return state;
  }
};
