import React from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import Other from "./pages/Other";
import Homepage from "./pages/Homepage";
import CountryPage from "./pages/CountryPage";
import DashboardPage from "./pages/DashboardPage";
import DetailsPage from "./pages/DetailsPage";
import Toolbar from "./components/navbar/Toolbar";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className='App'>
      <Toolbar />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/testing' component={Other} />
        <Route
          exact
          path='/locations/:countryId/posts'
          component={CountryPage}
        />
        <Route path='/locations/:userId/details' component={DetailsPage} />
        <Route path='/user/:userId/dashboard' component={DashboardPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
