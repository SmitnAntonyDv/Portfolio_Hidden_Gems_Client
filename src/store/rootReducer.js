import { combineReducers } from "redux";
import homepage from "./homepage/reducer";
import countrypage from "./countrypage/reducer";

export default combineReducers({
  homepage,
  countrypage,
});
