import React from 'react';
import './App.css';
import { Route, Switch} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute.js'
import Images from './components/Images.js'
import User from './components/User.js'
import Login from './components/Login.js'
import Register from './components/Register.js'
import NavBarCustom from './components/NavBarCustom.js'

function App() {
  return (
    <div>
      <NavBarCustom />
      <Switch>
          <ProtectedRoute exact path='/' component={ Images } />
          <ProtectedRoute exact path='/user' component={ User } />
          <Route exact path='/login' component={ Login } />
          <Route exact path='/register' component={ Register } />
          <Route path='*' component={() => '404 not found'} />
      </Switch> 
    </div>
  );
}

export default App;
