import React from 'react';
import logo from './logo.svg';
import './App.css';
import Homepage from './pages/Homepage';
import { Switch, Route } from 'react-router-dom';
import Other from './pages/Other';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/testing' component={Other} />
      </Switch>
    </div>
  );
}

export default App;
