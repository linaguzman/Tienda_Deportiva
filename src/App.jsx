
import Login from './pages/login';
import Ventas from './pages/Ventas';
import GestionarProductos from './pages/GestionarProductos';
import GestionarUsuarios from './pages/GestionarUsuarios';
import './styles/App.css'
import { Auth0Provider } from "@auth0/auth0-react";

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";



function App() {
  return (
    <Auth0Provider
    domain="dev-vm28akcj.us.auth0.com"
    clientId="t0cPAz8NPo0dTQ2TC9lSFxXf0YDRSbVI"
    redirectUri= {`${window.location.origin}/GestionarProductos`}>   
    <div className="App">
      <Router>
        <Switch>

         <Route path='/Index'>
          <Login />
         </Route>

         <Route path='/Ventas'>
          <Ventas />
         </Route>

         <Route path='/GestionarProductos'>
          <GestionarProductos />
         </Route>

         <Route path='/GestionarUsuarios'>
          <GestionarUsuarios />
         </Route>

         <Route path='/'>
          <Login />
         </Route>

        </Switch>
      </Router>
       
    </div>
  </Auth0Provider>
  );
}



export default App;


