export function selectSpecificCountryInfo(state) {
  // console.log("what my data?", state.countrypage);
  return state.countrypage;
}
export function selectLocationPost(state) {
  return state.countrypage.locationposts;
}
