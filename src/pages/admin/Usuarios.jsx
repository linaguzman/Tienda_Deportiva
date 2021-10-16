import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { Dialog, Tooltip } from '@material-ui/core';
import { obtenerUsuarios } from 'utils/api';
import 'react-toastify/dist/ReactToastify.css';


const Usuarios = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Insertar Nuevo usuario');
  const [colorBoton, setColorBoton] = useState('indigo');
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

  useEffect(() => {
    console.log('consulta', ejecutarConsulta);
    if (ejecutarConsulta) {
      obtenerUsuarios(setUsuarios, setEjecutarConsulta);
    }
  }, [ejecutarConsulta]);

  useEffect(() => {
    //obtener lista de usuarios desde el backend
    if (mostrarTabla) {
      setEjecutarConsulta(true);
    }
  }, [mostrarTabla]);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton('Crear Nuevo usuario');
      setColorBoton('green');
    } else {
      setTextoBoton('Mostrar todos los usuarios');
      setColorBoton('indigo');
    }
  }, [mostrarTabla]);

  return (
    <div className='flex h-full w-full flex-col items-center justify-start p-10'>
      <div className='flex flex-col w-full'>
        <h2 className='text-3xl font-extrabold text-gray-900'>
          Administración de Usuarios
        </h2>
        <button
          onClick={() => {
            setMostrarTabla(!mostrarTabla);
          }}
          className={`text-white bg-${colorBoton}-500 p-5 rounded-full m-6 w-28 self-end`}
        >
          {textoBoton}
        </button>
      </div>
      {mostrarTabla ? (
        <TablaUsuarios listaUsuarios={usuarios} setEjecutarConsulta={setEjecutarConsulta} />
      ) : (
        <FormularioCreacionUsuarios
          setMostrarTabla={setMostrarTabla}
          listaUsuarios={usuarios}
          setUsuarios={setUsuarios}
        />
      )}
      <ToastContainer position='bottom-center' autoClose={5000} />
    </div>
  );
};

const TablaUsuarios = ({ listaUsuarios, setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState('');
  const [usuariosFiltrados, setUsuariosFiltrados] = useState(listaUsuarios);

  useEffect(() => {
    setUsuariosFiltrados(
      listaUsuarios.filter((elemento) => {
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaUsuarios]);

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <input //cuadro busqueda
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder='Buscar'
        className='border-2 border-gray-700 px-3 py-1 self-start rounded-md focus:outline-none focus:border-indigo-500'
      />
      <h2 className='text-2xl font-extrabold text-gray-800'>Usuarios registrados</h2>
      <div className='hidden md:flex w-full'>
        <table className='tabla'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Rol usuario</th>
              <th>Estado usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((usuario) => {
              return (
                <FilaUsuario
                  key={nanoid()}
                  usuario={usuario}
                  setEjecutarConsulta={setEjecutarConsulta}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='flex flex-col w-full m-2 md:hidden'>
        {usuariosFiltrados.map((el) => {
          return (
            <div className='bg-gray-400 m-2 shadow-xl flex flex-col p-2 rounded-xl'>
              <span>{el.name}</span>
              <span>{el.lastname}</span>
              <span>{el.role}</span>
              <span>{el.status}</span>
              
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FilaUsuario = ({ usuario, setEjecutarConsulta }) => {
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [infoNuevoUsuario, setInfoNuevoUsuario] = useState({
    _id: usuario._id,
    name: usuario.name,
    lastname: usuario.lastname,
    role: usuario.role,
    status: usuario.status,
   
  });

  const actualizarUsuario = async () => {
    //enviar la info al backend
    const options = {
      method: 'PATCH',
      url: 'http://localhost:5000/usuario/editar',
      headers: { 'Content-Type': 'application/json' },
      data: { ...infoNuevoUsuario, id: usuario._id },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success('Usuario modificado con éxito');
        setEdit(false);
        setEjecutarConsulta(true);
      })
      .catch(function (error) {
        toast.error('Error modificando el usuario');
        console.error(error);
      });
  };

  const eliminarUsuario = async () => {
    const options = {
      method: 'DELETE',
      url: 'http://localhost:5000/usuario/eliminar',
      headers: { 'Content-Type': 'application/json' },
      data: { id: usuario._id },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success('Usuario eliminado con éxito');
        setEjecutarConsulta(true);
      })
      .catch(function (error) {
        console.error(error);
        toast.error('Error eliminando el usuario');
      });
    setOpenDialog(false);
  };

  return (
    <tr>
      {edit ? (
        <>
          <td>{infoNuevoUsuario._id}</td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoUsuario.name}
              onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, name: e.target.value })}
            />
          </td>

          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoUsuario.lastname}
              onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, lastname: e.target.value })}
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoUsuario.role}
              onChange={(e) =>
                setInfoNuevoUsuario({ ...infoNuevoUsuario, role: e.target.value })
              }
            />
          </td>

          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoUsuario.status}
              onChange={(e) =>
                setInfoNuevoUsuario({ ...infoNuevoUsuario, status: e.target.value })
              }
            />
          </td>

          

        </>
      ) : (
        <>
          <td>{usuario._id.slice(23)}</td>
          <td>{usuario.name}</td>
          <td>{usuario.lastname}</td>
          <td>{usuario.role}</td>
          <td>{usuario.status}</td>
        </>
      )}
      <td>
        <div className='flex w-full justify-around'>
          {edit ? (
            <>
              <Tooltip title='Confirmar Edición' arrow>
                <i
                  onClick={() => actualizarUsuario()}
                  className='fas fa-check text-green-700 hover:text-green-500'
                />
              </Tooltip>
              <Tooltip title='Cancelar edición' arrow>
                <i
                  onClick={() => setEdit(!edit)}
                  className='fas fa-ban text-yellow-700 hover:text-yellow-500'
                />
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title='Editar Usuario' arrow>
                <i
                  onClick={() => setEdit(!edit)}
                  className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500'
                />
              </Tooltip>
              <Tooltip title='Eliminar Usuario' arrow>
                <i
                  onClick={() => setOpenDialog(true)}
                  className='fas fa-trash text-red-700 hover:text-red-500'
                />
              </Tooltip>
            </>
          )}
        </div>
        <Dialog open={openDialog}>
          <div className='p-8 flex flex-col'>
            <h1 className='text-gray-900 text-2xl font-bold'>
              ¿Está seguro de querer eliminar el usuario?
            </h1>
            <div className='flex w-full items-center justify-center my-4'>
              <button
                onClick={() => eliminarUsuario()}
                className='mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md'
              >
                Sí
              </button>
              <button
                onClick={() => setOpenDialog(false)}
                className='mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md'
              >
                No
              </button>
            </div>
          </div>
        </Dialog>
      </td>
    </tr>
  );
};

const FormularioCreacionUsuarios = ({ setMostrarTabla, listaUsuarios, setUsuarios }) => {
  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevoUsuario = {};
    fd.forEach((value, key) => {
      nuevoUsuario[key] = value;
    });


    const options = {
      method: 'POST',
      url: 'http://localhost:5000/Usuario/nuevo',
      headers: { 'Content-Type': 'application/json' },
      data: { name: nuevoUsuario.name, lastname: nuevoUsuario.lastname, status: nuevoUsuario.status, role: nuevoUsuario.role },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success('Agregando usuario nuevo');
      })
      .catch(function (error) {
        console.error(error);
        toast.error('Error al agregar usuario');
       });

    setMostrarTabla(true);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-800'>Crear nuevo usuario</h2>
      <form ref={form} onSubmit={submitForm} className='flex flex-col'>
        <label className='flex flex-col' htmlFor='name'>
          Nombre del usuario
          <input
            name='name'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='Ingrese nombre'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='lastname'>
          Apellido del usuario
          <input
            name='lastname'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='Ingrese apellido'
            required
          />
        </label>

        <label className='flex flex-col' htmlFor='status'>
          Estado de usuario
          <select
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            name='status'
            required
            defaultValue={0}
          >
            <option disabled value={0}>
              Seleccione Estado Usuario
            </option>
            <option>Activo</option>
            <option>Inactivo</option>
          </select>
        </label>

        <label className='flex flex-col' htmlFor='role'>
          Rol de Usuario
          <select
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            name='role'
            required
            defaultValue={0}
          >
            <option disabled value={0}>
              Seleccione Rol usuario
            </option>
            <option>Administrador</option>
            <option>Usuario Normal</option>
          </select>
        </label>
        <button
          type='submit'
          className='col-span-3 bg-green-400 p-4 rounded-full shadow-md hover:bg-green-600 text-white'
        >
          Guardar Usuario
        </button>
      </form>
    </div>
    
  );
};

export default Usuarios;
