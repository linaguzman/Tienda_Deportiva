import React, { useEffect, useState, useRef} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { obtenerUsuarios, registrarUsuarios, editarUsuarios} from '../utils/api';
import { nanoid } from 'nanoid';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const GestionarUsuariosBackend= []

    /*Esta función permite editar cada registro de la tabla de usuario, solo permite editar estado y rol*/
    
    const FilaUsuarios = ({usuario})=>{
    
        const [edit, setEdit] = useState(false);
        const [infoUsuario, setInfoUsuario]=useState(
            {
                id_usuario: usuario.id_usuario,
                given_name: usuario.given_name,
                family_name: usuario.family_name,
                email: usuario.email,
                rol: usuario.rol,
                estado: usuario.estado,
            }
        );
    
        const actualizarDatosUsuarios = async () =>{
            await editarUsuarios(
                {   _id:usuario._id,
                    id_usuario: infoUsuario.id_usuario,
                    given_name: infoUsuario.given_name,
                    family_name: infoUsuario.family_name,
                    email: infoUsuario.email,
                    rol: infoUsuario.rol,
                    estado: infoUsuario.estado,
                },
                (response) => {
                    toast.success('Usuario editado con éxito');
                    setEdit(false);
                },
                (error) => {
                    toast.error('Error editando el Usuario');
                    console.error(error);
                }
            );
        };
        
        return(
            <tr>
                { edit ? (
                <>
                <td>{usuario.id_usuario}</td>
                <td>{usuario.given_name}</td>
                <td>{usuario.family_name}</td>
                <td>{usuario.email}</td>
                <td>
                 <select name="rol_usuario" className="listaUsuarios" required value={infoUsuario.rol} onChange={(e)=>setInfoUsuario({...infoUsuario, rol:e.target.value})} >
                    <option disabled value={0}> Selecciona un rol</option>
                        <option>Administrador</option>
                        <option>Vendedor</option>
                </select>
                </td>
                 <td>
                 <select name="estado_usuario" className="listaUsuarios" required value={infoUsuario.estado} onChange={(e)=>setInfoUsuario({...infoUsuario, estado:e.target.value})}>
                    <option disabled value={0}>Seleccione el estado</option>
                        <option>Aprobado</option>
                        <option>Pendiente</option>
                </select>
                </td>
                <td>
                <button className="checkButton" onClick={actualizarDatosUsuarios}>
                            <span className="material-icons">check</span></button></td>
                <td>
                <button className="editButton" onClick={()=>setEdit(true)}> 
                <span className="material-icons">cancel</span></button></td>
                            
                </> 
                ) : (
                        <> 
                        <td>{usuario.id_usuario}</td>
                        <td>{usuario.given_name}</td>
                        <td>{usuario.family_name}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.rol}</td>
                        <td><label className={usuario.estado==='Aprobado'?"badgeAvailable":"badgeNotAvailable"}>
                            {usuario.estado}</label></td>
                        <td><button className="editButton" onClick={()=>setEdit(true)}> 
                            <span className="material-icons">edit</span></button></td>            
                    </>
                )
                }        
            </tr>     
            
        ) 
       
    };
    
    const GestionarUsuarios = () => {
    
        const [GestionarUsuarios, setGestionarUsuarios] = useState([]);
        const form=useRef(null);
        const [busqueda, setBusqueda]=useState("");
        // const [ejecutarConsulta, setEjecutarConsulta]=useState(true);
        const [usuariosFiltrados, setUsuariosfiltrados]=useState(GestionarUsuariosBackend);
    
        //hacer esto cuando tengamos la base lista de usuarios, desde hora y 50m min para complementar, clase 14
        // useEffect(() =>{
        //     if (ejecutarConsulta){
    
        //     }
        // }, [ejecutarConsulta]);
        
        //este use effect se debe actualizar cuando se tenga la conexión con el backend
        useEffect(() => {
            if (GestionarUsuarios) {
                obtenerUsuarios((response) => {
                    console.log('la respuesta que se recibio fue', response);
                    setGestionarUsuarios(response.data);
                },
                (error) => {
                    console.error('Salio un error:', error);
                }
                );
                
            }
    
        }, []);
    
        useEffect(() => {
            console.log("Busqueda", busqueda);
            console.log("lista Original",GestionarUsuariosBackend);
            console.log("listafiltrada",
            setUsuariosfiltrados(
                GestionarUsuariosBackend.filter(elemento=>{
                return JSON.stringify(elemento).includes(busqueda);
    
            }))
            )
    
        }, [busqueda]);
    
        const submitEdit =(e)=>{
            e.preventDefault();
            const fd = new FormData(form.current);
            console.log(e);
        }
            return (
                <div>
                    <Header/>
                    <div className="textosInicioSeccion">
                    <div className="tituloSeccion"></div>
                    <div className="descripcionSeccion"></div>
                </div>   
                    <section>    
                        <ul className="posicionBuscador"> 
                            <li>
                                <div className="label">Ingresa el ID del usuario:</div>
                                <input id="busqueda" type="text" value={busqueda} onChange={(e) => setBusqueda(e.target.value)}/>
                                <button className="botonBuscar" type="submit">Buscar</button>
                            </li>
                        </ul>

                        <div className="container__tabla">
                            <div className="container__info2">
                                <h2>Lista de usuarios en el sistemas</h2>
                        {/* <form ref={form} onSubmit={submitEdit}>*/ }
                            <table summary="Usuarios registrados" className="usersTable">
                                
                                    <thead>
                                    <tr>
                                        <th scope="col">ID Usuario</th>
                                        <th scope="col">Nombres</th>
                                        <th scope="col">Apellidos</th>
                                        <th scope="col">Correo</th>
                                        <th scope="col">Rol</th>
                                        <th scope="col">Estado usuario</th>
                                        <th scope="col" id="acciones">Acción</th> 
                                    </tr>
                                    </thead>
                                <tbody>
                                {GestionarUsuarios.map((usuario) => {
                                    return (
                                        <FilaUsuarios key={nanoid()} usuario={usuario}/>
                                    );
                                })}
                                </tbody>
                            </table>
                        {/* </form>*/ }
                        </div>
                    </div>

                </section>
            <Footer/>
        </div>               
    )};   
    
    /* FORMULARIO Crear Nuevos Productos */
    
    const RegistrarUsuarios = ({ setMostrarTablaUsuarios, listaUsuarios, setUsuarios }) => {
        const form = useRef(null);
    
        //async trabaja con await axios    
        const submitForm = async (e) => {
            e.preventDefault();
            const fd = new FormData(form.current);
    
            const nuevoUsuario = {};
            fd.forEach((value, key) => {
                nuevoUsuario[key] = value;
            });
            //se define el método POST y la url 3001 (AQUÍ SE MUESTRAN DATOS)
            await registrarUsuarios(
                {
                    idUsuario: nuevoUsuario.idUsuario,
                    descripcion: nuevoUsuario.descripcion,
                    valor: nuevoUsuario.valor,
                    estado: nuevoUsuario.estado,
                },
                (response) => {
                  console.log(response.data);
                  toast.success('Nuevo usuario agregado con éxito');
                },
                (error) => {
                  console.error(error);
                  toast.error('Error agregando el usuario');
                }
              );
          
            setMostrarTablaUsuarios(true);
        };
          
        
        return(
            <div>
                <Header/>
                <div className="textosInicioSeccion">
                <div className="tituloSeccion">
                    <span>Agregar nuevo usuario</span>
                        </div>
                <div className="descripcionSeccion">Ingresa los datos del nuevo usuario.</div>
            </div>
                <div className="contenedorFormulario">
                <form ref={form} onSubmit={submitForm} className='flex flex-col'>
    
                    <label htmlFor="id">ID de Usuario
                    <input type="number" name="idUsuario"
                    placeholder="Ejemplo:Name" required/>
                    </label>
                
                    <label htmlFor="descripcionUsuario">Descripción del Usuario
                    <select name="descripcion" required defaultValue={0} >
                        <option disabled value={0}> Selecciona</option>
                            <option>Bonsai Chumono</option>
                            <option>Bonsai Komono</option>
                            <option>Bonsai Kotate</option>
                            <option>Bonsai Omono</option>
                            <option>Bonsai Shito</option>
                            <option>Bonsai Shohin</option>
                    </select>
                    </label>
    
                    <label htmlFor="valorProducto">Valor producto
                    <input type="number" name="valor"
                    placeholder="Ingresa el valor en pesos..." required/>
                    </label>
                
                    <label htmlFor="estadoUsuario">Estado del usuario
                        <select name="estado" required defaultValue={0} >
                            <option disabled value={0}> Selecciona un estado</option>
                            <option>Disponible</option>
                            <option>No disponible</option>
                        </select>
                    </label>
                    <button type="submit" className="botonGuardarUsuario"> Guardar nuevo Usuario
                    </button>
                </form>
                </div>
            <Footer/>
        </div>
        );
    };
    
export default GestionarUsuarios;

