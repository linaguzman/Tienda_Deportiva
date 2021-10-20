import React from 'react'
import { Link } from "react-router-dom";

const Header = () => {
    return (
    <div>
        <header id="header">
        <div className="container__header">
        <div class="logo">
            <img src="tecno.png" alt="" />
          </div>
          <div className="container__nav">
            <nav id="nav">
            <ul>
                <Link to='/Ventas'><li className="botonNavbar">Ventas</li></Link>
                <Link to='/GestionarProductos'><li className="botonNavbar">Productos</li></Link>
                <Link to='/GestionarUsuarios'><li className="botonNavbar">Usuarios</li></Link>
                <Link to='/'><div class="btn__menu" id="btn_menu"><button type="submit" className="botonSalir">Salir</button></div></Link> 
                <i class="fas fa_bars"></i>               
            </ul>
            </nav>
              
          </div>
        </div>
      </header>
    </div>
    )
}

export default Header
