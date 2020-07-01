import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import Other from "./pages/Other";
import Homepage from "./pages/Homepage";
import CountryPage from "./pages/CountryPage";
import DashboardPage from "./pages/DashboardPage";
import DetailsPage from "./pages/DetailsPage";
import Toolbar from "./components/navbar/Toolbar";
function App() {
  return (
    <div className='App'>
      <Toolbar />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/testing' component={Other} />
        <Route path='/locations/:countryId/posts' component={CountryPage} />
        <Route path='/locations/:id/details' component={DetailsPage} />
        <Route path='/user/:id/dashboard' component={DashboardPage} />
      </Switch>
    </div>
  );
}

export default App;
