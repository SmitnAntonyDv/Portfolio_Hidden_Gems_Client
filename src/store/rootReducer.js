import { combineReducers } from "redux";
import homepage from "./homepage/reducer";
import countrypage from "./countrypage/reducer";
import countryAPI from "./countrypage/countryAPI/reducer";

export default combineReducers({
  homepage,
  countrypage,
  countryAPI,
});
