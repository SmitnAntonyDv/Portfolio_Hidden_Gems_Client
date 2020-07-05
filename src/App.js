import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import Other from "./pages/Other";
import Homepage from "./pages/Homepage";
import CountryPage from "./pages/CountryPage";
import DashboardPage from "./pages/DashboardPage";
import DetailsPage from "./pages/DetailsPage";
import Toolbar from "./components/navbar/Toolbar";
import Footer from "./components/footer/Footer";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import PostPage from "./pages/PostPage";

import { useDispatch, useSelector } from "react-redux";
import { getUserWithStoredToken } from "./store/user/actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

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
        <Route path='/locations/:postId/details' component={DetailsPage} />
        <Route path='/user/:userId/dashboard' component={DashboardPage} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/user/postlocation' component={PostPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
