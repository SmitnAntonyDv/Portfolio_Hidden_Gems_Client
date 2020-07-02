import { combineReducers } from "redux";
import homepage from "./homepage/reducer";
import countrypage from "./countrypage/reducer";
import countryAPI from "./countrypage/countryAPI/reducer";
import detailspage from "./detailpage/reducer";
import weatherAPI from "./weather/reducer";

export default combineReducers({
  homepage,
  countrypage,
  countryAPI,
  detailspage,
  weatherAPI,
});
