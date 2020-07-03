import { combineReducers } from "redux";
import user from "./user/reducer";
import homepage from "./homepage/reducer";
import countrypage from "./countrypage/reducer";
import countryAPI from "./countrypage/countryAPI/reducer";
import detailspage from "./detailpage/reducer";
import weatherAPI from "./weather/reducer";

export default combineReducers({
  user,
  homepage,
  countrypage,
  countryAPI,
  detailspage,
  weatherAPI,
});
