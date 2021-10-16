import React from 'react';
import ImagenLogo from './ImagenLogo';
import { Link } from 'react-router-dom';
import useActiveRoute from 'hooks/useActiveRoute';

const Sidebar = () => {
  return (
    <nav className='hidden lg:flex lg:w-72 border border-gray-300 h-full flex-col bg-gray-200 p-4 sidebar'>
      <Link to='/admin'>
        <ImagenLogo />
      </Link>

      <div className='my-4'>
        <Ruta icono='fas fa-user' ruta='/admin/perfil' nombre='Perfil' />
        <Ruta icono='#' ruta='' nombre='En contruccion' />
        <Ruta icono='#' ruta='' nombre='En construcion' />
        <Ruta icono='fas fa-users' ruta='/admin/usuarios' nombre='Usuarios' />
      </div>
      <button>Cerrar Sesión</button>
    </nav>
  );
};

const Ruta = ({ icono, ruta, nombre }) => {
  const isActive = useActiveRoute(ruta);
  return (
    <Link to={ruta}>
      <button
        className={`p-1 my-2  bg-${
          isActive ? 'indigo' : 'gray'
        }-700 hover:bg-indigo-900 flex w-full items-center text-white rounded-md`}
      >
        <i className={`${icono} w-10`} />
        {nombre}
      </button>
    </Link>
  );
};

export default Sidebar;
