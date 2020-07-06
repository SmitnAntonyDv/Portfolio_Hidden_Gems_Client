import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import homepage from "./homepage/reducer";
import countrypage from "./countrypage/reducer";
import countryAPI from "./countrypage/countryAPI/reducer";
import detailspage from "./detailpage/reducer";
import weatherAPI from "./weather/reducer";
import newpost from "./newpost/reducer";

export default combineReducers({
  user,
  homepage,
  countrypage,
  countryAPI,
  detailspage,
  weatherAPI,
  newpost,
});
