import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { obtenerProductos, registrarProducto, editarProducto} from '../utils/api';
import { nanoid } from 'nanoid';


const GestionarProductos = () => {

    const [productos, setProductos] = useState([]);
    const [mostrarTablaProductos, setMostrarTablaProductos] = useState(true);
    const [textoBoton,setTextoBoton] = useState('Crear nuevo Producto');
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
    //const [colorBoton,setColorBoton] = useState();

  
    useEffect(() => {
        console.log('consulta', ejecutarConsulta);
        if (ejecutarConsulta) {
            obtenerProductos((response) => {
                console.log('la respuesta que se recibio fue', response);
                setProductos(response.data);
            },
            (error) => {
                console.error('Salio un error:', error);
            }
            );
            setEjecutarConsulta(false); 
        }
    }, [ejecutarConsulta]);
    

    //obtener lista desde el back 
    useEffect(() => {
        if (mostrarTablaProductos) {
            setEjecutarConsulta(true);
        }
    }, [mostrarTablaProductos]);
      

    /*useEffect(() => {
        setGestionarProductos(GestionarProductosBackend);
    }, []);*/

    useEffect(() => {
        if (mostrarTablaProductos) {
            setTextoBoton('Crear nuevo Producto');
        } else {   
            setTextoBoton('Volver a Gestionar Productos');
            //setColorBoton();
        }
    }, [mostrarTablaProductos]);

        
    return (
        <div>
            <div>
                <button
                onClick={() => {
                    setMostrarTablaProductos(!mostrarTablaProductos)
                }}
                className="botonCrear">                
                {textoBoton}
                </button>
            </div>

            {mostrarTablaProductos ? (
            <TablaProductos listaProductos={productos} setEjecutarConsulta={setEjecutarConsulta}/>
            ) : (
                <RegistrarProductos
                    setMostrarTablaProductos={setMostrarTablaProductos}
                    listaProductos={productos}
                    setProductos={setProductos}/>
                )}
            <ToastContainer position='bottom-center' autoClose={5000} />
        </div>
    );
};    
/*------------ Tabla Productos --------------*/


const TablaProductos = ({ listaProductos, setEjecutarConsulta }) => {
    const [busqueda, setBusqueda] = useState('');
    const [productosFiltrados, setProductosFiltrados] = useState(listaProductos);

    // ******** AQUÍ VA el useEffect de filtro y búsqueda *********

    useEffect(() => {
        setProductosFiltrados(
          listaProductos.filter((elemento) => {
            return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
          })
        );

    }, [busqueda, listaProductos]);
    
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
                        <div className="label"></div>
                        <input id="busqueda" type="text" value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        placeholder=" ID del producto"
                        />
                        <button className="botonBuscar" type="submit">Buscar</button>
                    </li>
                </ul>
                <div className="productsTable">
                    <table summary="Productos registrados">
                        <caption></caption>
                            <thead>
                            <tr>
                                <th scope="col">ID Producto</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Valor</th>
                                <th scope="col">Estado</th>
                                <th scope="col" id="accion">Acción</th>
                            </tr>
                            </thead>
                        <tbody>
                            {productosFiltrados.map((producto) => {   
                            return (
                                <FilaProducto
                                    key={nanoid()}
                                    producto={producto}
                                    setEjecutarConsulta={setEjecutarConsulta}
                                    />
                                );                   
                            })}
                        </tbody>
                    </table>
                </div>
                {/*<div>
                    {productosFiltrados.map((el) => {
                        return (
                        <div>
                        <span>{el.idProducto}</span>
                        <span>{el.descripcion}</span>
                        <span>{el.valor}</span>
                        <span>{el.estado}</span>
                        </div>  
                        );
                    })}
                </div>*/}                 
            </section>
            <Footer/>
        </div>
    );
};


/*------------ Fila Productos - donde se pueden editar --------------*/

const FilaProducto = ({ producto, setEjecutarConsulta }) => {
    
    const [edit, setEdit] = useState(false);
    const [infoNuevoProducto, setInfoNuevoProducto] = useState(
        {
        idProducto: producto.idProducto,
        descripcion: producto.descripcion,
        valor: producto.valor,
        estado: producto.estado,
        }
    );

    const actualizarProducto = async () => {
    //enviar la info al back y se define el método POST con import axios de utils/api
    //****** AJUSTAR LA URL ******
    //async trabaja con await axios
    //enviar la info al back
    
        await editarProducto(
            
            {   
                _id: producto._id,
                idProducto: infoNuevoProducto.idProducto,
                descripcion: infoNuevoProducto.descripcion,
                valor: infoNuevoProducto.valor,
                estado: infoNuevoProducto.estado,
            },
            (response) => {
                toast.success('Producto editado con éxito');
                setEdit(false);
                setEjecutarConsulta(true);
            },
            (error) => {
                toast.error('Error editando el producto');
                console.error(error);
            }
        );
    };

    /******* Código con -input- para editar los producto **********/

    return (
        <tr>
            {edit ? (
            <>
                <td>{infoNuevoProducto.idProducto}
                </td>
                <td>
                    <select name="descripcion" className="estilosCampos"
                        defaultValue={infoNuevoProducto.descripcion}
                        onChange={(e) => setInfoNuevoProducto({ ...infoNuevoProducto, descripcion: e.target.value })}>
                        <option disabled value={0}> Selecciona un estado</option>
                        <option>Bonsai Chumono</option>
                        <option>Bonsai Komono</option>
                        <option>Bonsai Kotate</option>
                        <option>Bonsai Omono</option>
                        <option>Bonsai Shito</option>
                        <option>Bonsai Shohin</option>
                    </select>
                </td>
                <td>
                    
                    <input name="valor" className="campoValor"
                        //type="number"
                        defaultValue={infoNuevoProducto.valor}
                        //required
                        //controlar el componente con un solo estado (e = elemento que entra)
                        //(...)spread operator
                        onChange={(e) => setInfoNuevoProducto({ ...infoNuevoProducto, valor: e.target.value })} >
                    </input>    
                </td>
                <td>
                    <select name="estado" className="estilosCampos"
                        //required
                        defaultValue={infoNuevoProducto.estado}
                        onChange={(e) => setInfoNuevoProducto({ ...infoNuevoProducto, estado: e.target.value })}>
                        <option disabled value={0}> Selecciona un estado</option>
                        <option>Disponible</option>
                        <option>No disponible</option>
                    </select>
                </td>
                <td>
                    <button className="checkButton" onClick={actualizarProducto}>
                    <span className="material-icons">check</span></button> 
                </td>
                <td>
                    <button className="cancelButton" onClick={()=>setEdit(!edit)}> 
                    <span className="material-icons">cancel</span>
                    </button>
                </td>
                </>
            ) : (
                <>
                <td>{producto.idProducto}</td>
                <td>{producto.descripcion}</td>
                <td>{producto.valor}</td>
                <td><label className={producto.estado==='Disponible' ? 'badgeAvailable':'badgeNotAvailable'}>
                    {producto.estado}</label></td>
                <td><button className="editButton" onClick={() => setEdit(true)}>
                    <span className="material-icons">edit</span>
                    </button>
                </td>
            </>
            )}
            
        </tr>
    );
};
               

/*------------ FORMULARIO Crear Nuevos Productos --------------*/

const RegistrarProductos = ({ setMostrarTablaProductos, listaProductos, setProductos }) => {
    const form = useRef(null);

    //async trabaja con await axios    
    const submitForm = async (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);

        const nuevoProducto = {};
        fd.forEach((value, key) => {
            nuevoProducto[key] = value;
        });
        //se define el método POST y la url 3001 (AQUÍ SE MUESTRAN DATOS)
        await registrarProducto(
            {
                idProducto: nuevoProducto.idProducto,
                descripcion: nuevoProducto.descripcion,
                valor: nuevoProducto.valor,
                estado: nuevoProducto.estado,
            },
            (response) => {
              console.log(response.data);
              toast.success('Nuevo producto agregado con éxito');
            },
            (error) => {
              console.error(error);
              toast.error('Error agregando el producto');
            }
          );
      
        setMostrarTablaProductos(true);
    };
      
    
    return(
        <div>
            <Header/>
            <div className="textosInicioSeccion">
            <div className="tituloSeccion">
                <span>Agregar nuevo producto</span>
                    </div>
            <div className="descripcionSeccion">Ingresa los datos del nuevo producto.</div>
        </div>
            <div className="contenedorFormulario">
            <form ref={form} onSubmit={submitForm} className='flex flex-col'>

                <label htmlFor="id">ID de Producto
                <input type="number" name="idProducto"
                placeholder="Ejemplo: 0001" required/>
                </label>
            
                <label htmlFor="descripcionProducto">Descripción del producto
                <select name="descripcion" required defaultValue={0} >
                    <option disabled value={0}> Selecciona un producto</option>
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
            
                <label htmlFor="estadoProducto">Estado del producto
                    <select name="estado" required defaultValue={0} >
                        <option disabled value={0}> Selecciona un estado</option>
                        <option>Disponible</option>
                        <option>No disponible</option>
                    </select>
                </label>
                <button type="submit" className="botonGuardarProducto"> Guardar nuevo producto
                </button>
            </form>
            </div>
        <Footer/>
    </div>
    );
};

export default GestionarProductos;
