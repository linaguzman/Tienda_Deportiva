import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Filtros from '../components/Filtros';
import { nanoid } from 'nanoid';

const GestionarVentasBackend = [
    {
        idVenta: "0001",
        fecha_venta:"08/10/2021",
        fecha_pago:"8/10/2021",
        estado_venta: "Entregada",
        idCliente:'0001',
        nombre_cliente:'Laura Rojas',
        total_venta: "$120.000",
        idVendedor: "001",
    },
    {
        idVenta: "0002",
        fecha_venta:"08/10/2021",
        fecha_pago:"8/10/2021",
        estado_venta: "Cancelada",
        idCliente:'0001',
        nombre_cliente:'Laura Rojas',
        total_venta: "$120.000",
        idVendedor: "001",
    },
    {
        idVenta: "0003",
        fecha_venta:"08/10/2021",
        fecha_pago:"8/10/2021",
        estado_venta: "En Progreso",
        idCliente:'0001',
        nombre_cliente:'Laura Rojas',
        total_venta: "$120.000",
        idVendedor: "001",
    },
    {
        idVenta: "0004",
        fecha_venta:"08/10/2021",
        fecha_pago:"8/10/2021",
        estado_venta: "En Progreso",
        idCliente:'0001',
        nombre_cliente:'Laura Rojas',
        total_venta: "$120.000",
        idVendedor: "001",
    },
]

const Ventas = () =>{
    const [Ventas, setVentas] = useState([]);
    const [mostrarTablaVentas, setMostrarTablaVentas] = useState(true);
    const [textoBoton,setTextoBoton] = useState('Registrar Venta');

    useEffect(() => {
        setVentas(GestionarVentasBackend);
    }, []);

    useEffect(() => {
        if (mostrarTablaVentas) {
            setTextoBoton('Registrar Venta');
        } else {
            setTextoBoton('Volver a Gestionar Ventas');
            //setColorBoton();
        }
    }, [mostrarTablaVentas]);

    return(
        <div>
        <button
        onClick={() => {
            setMostrarTablaVentas(!mostrarTablaVentas)
        }}
        className="botonCrear">
        {textoBoton}
        </button>
        {mostrarTablaVentas ? (<TablaVentas listaVentas={Ventas}/>
        ) : ( <RegistrarVentas
            setMostrarTablaVentas={setMostrarTablaVentas}
            listaVentas={Ventas}
            setVentas={setVentas}
        />
        )}
        <ToastContainer position='bottom-center' autoClose={4000} />
    </div>
    )
}

/*---------Tabla ventas--------------------*/


const TablaVentas = ({ listaVentas }) => {

    useEffect(() => {
        console.log("listado de ventas en la tabla",listaVentas)
    }, [listaVentas]);



    return (
    <div>
        <Header/>
            <div className="textosInicioSeccion">
                <div className="tituloSeccion">
                    {/* <span>Gestionar Ventas</span>
                    <button  className="botonCrear">Registrar Venta</button>*/}
                </div>
                <div className="descripcionSeccion">.
            </div>
    </div>
        <section>
            <ul className="posicionBuscador">
                <li>
                    <div className="label">Ingresa el ID de la venta: </div>
                            <Filtros/>
                </li>
            </ul>

                    <div className="container__tabla">
                         <div className="container__info2">
                        <table summary="Ventas registradas" className="usersTable">
                            <caption></caption>
                                <thead>
                                <tr>
                                    <th scope="col">ID Venta</th>
                                    <th scope="col">Fecha Venta</th>
                                    <th scope="col">Fecha Pago</th>
                                    <th scope="col">Estado Venta</th>
                                    <th scope="col">ID Cliente</th>
                                    <th scope="col">Nombre Cliente</th>
                                    <th scope="col">Valor total</th>
                                    <th scope="col">ID Vendedor</th>
                                    <th scope="col">Acciones</th>

                                </tr>
                            </thead>
                            <tbody>
                                    {listaVentas.map((ventas) => {
                                        return(
                                        <tr key={nanoid()}>
                                                <td>{ventas.idVenta}</td>
                                                <td>{ventas.fecha_venta}</td>
                                                <td>{ventas.fecha_pago}</td>
                                                <td><label className=
                                                {ventas.estado_venta==='Entregada' ? "badgeAvailable" : ventas.estado_venta==='En Progreso' ? "badgeInProgress" : "badgeNotAvailable"} >{ventas.estado_venta}</label>
                                                </td>
                                                <td>{ventas.idCliente}</td>
                                                <td>{ventas.nombre_cliente}</td>
                                                <td>{ventas.total_venta}</td>
                                                <td>{ventas.idVendedor}</td>
                                                <td>
                                                        <button className="editButton">
                                                        <span className="material-icons">edit</span></button>
                                                </td>
                                                {/* <td>    
                                                        <button className="editButton">
                                                        <span className="material-icons">edit</span></button> 
                                                </td> */}
                                        </tr>
                                        );
                                        })}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </section>
        <Footer/>
    </div>
    )
};

/*------------Registrar Ventas----------------------*/

const RegistrarVentas = ({ setMostrarTablaVentas, listaVentas, setVentas }) => {
    const form = useRef(null);

    const submitForm = (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);

        const nuevaVenta = {};
        fd.forEach((value, key) => {
            nuevaVenta[key] = value;
        });

        setMostrarTablaVentas(true);
        setVentas([...listaVentas, nuevaVenta]);
        toast.success('Venta registrada exitosamente');
    };

    return(
        <div>
            <Header/>

            <div className="textosInicioSeccion">
                <div className="tituloSeccion">
                    <span></span></div>
                <div className="descripcionSeccion"></div>
            </div>
            <section className="contenedorFormVentas"id="container">
                <div className="datos_cliente">
                  <div className="action_cliente">
                      <h4>Datos del Cliente</h4>
                      <a href="#" className="btn_new btn_new_cliente"><i class="fas fa-plus"></i>Nuevo Cliente</a>
                  </div>
                  <form ref={form} onSubmit={submitForm} name ="form_new_cliente_venta" id= "form_new_cliente_venta" class="datos">
                      <input id="input_ventas" type="hidden" name="action" value="addCliente"/>
                      <input id="input_ventas" type="hidden" name="idCliente" value="" required/>

                      <div className="wd20">
                          <label id="label">Cédula</label>
                          <input id="input_ventas" type="text" name="ced_cliente" required/>
                      </div>
                      <div className="wd50">
                          <label id="label">Nombre</label>
                          <input id="input_ventas" type="text" name="nom_cliente" disabled required/>
                      </div>
                      <div className="wd50">
                          <label id="label">Teléfono</label>
                          <input id="input_ventas" type="text" name="tel_cliente" disabled required/>
                      </div>
                      <div className="wd50">
                          <label id="label">Dirección</label>
                          <input id="input_ventas" type="text" name="dir_cliente" disabled required/>
                      </div>
                      <div id="div_registro_cliente" className= "wd100">
                          <button type="submit" className="btn_save"><i className="far fa-save fa-lg"></i>Guardar</button>
                      </div>
                  </form>
                 </div>

              <div className="datos_venta">
                  <h4>Datos del  Vendedor</h4>
                  <div className="datos">
                      <div className="wd50">
                          <label id="label">ID Vendedor</label>
                          <input id="input_ventas" type="text" name="idVendedor" required/>
                      </div>
                      <div className="wd50">
                          <label id="label">Nombre</label>
                          <input id="input_ventas" type="text" name="nom_cliente" disabled required/>
                      </div>
                      <div className="wd50">
                          <label id="label">Fecha de facturación</label>
                          <input id="input_fecha" type="date" name="fecha_fact" required/>
                      </div>
                      <div className="wd100">
                      </div>
                  </div>
              </div>

              <div className="datos_venta">
                  <h4>Datos Venta</h4>
                  <div className="datos">
                      {/* <div className="wd50">
                          <label id="label">Código</label>
                          <input id="input_ventas" type="text" name="code" required/>
                      </div> */}
                      <div className="wd50">
                          <label id="label">Producto
                          <select id="listaProductos" name="descripcion" required defaultValue={0} >
                            <option disabled value={0}> Selecciona un producto</option>
                                <option>Bonsai Chumono</option>
                                <option>Bonsai Komono</option>
                                <option>Bonsai Kotate</option>
                                <option>Bonsai Omono</option>
                                <option>Bonsai Shito</option>
                                <option>Bonsai Shohin</option>
                        </select>
                      </label>
                      </div>
                      <div className="wd50">
                          <label id="label">Cantidad</label>
                          <input id="input_fecha" min={1} type="number" name="quantity" required/>
                      </div>
                      <div className="wd50">
                          <label id="label">Precio</label>
                          <input id="input_fecha" type="number" name="price" required disabled/>
                      </div>
                      <div className="wd50">
                          <label id="label">Fecha de Pago</label>
                          <input id="input_fecha" type="date" name="fecha_pago" required/>
                      </div>
                  </div>
              </div>

              <table border="1"id="tbl_venta">
                  <thead>
                      <tr>
                          <th id="t_ventas">Código</th>
                          <th id="t_ventas" colspan="2">Producto</th>
                          <th id="t_ventas">Cantidad</th>
                          <th id="t_ventas" className="textright">Precio Unitario</th>
                          <th id="t_ventas" className="textright">Precio Total</th>
                          <th id="t_ventas"></th>
                      </tr>
                  </thead>

                  <tbody id="detalle_venta">
                      <tr>
                          <td>1001</td>
                          <td id="t_ventas" colspan="2">Tennis</td>
                          <td id="t_ventas" className="textcenter">1</td>
                          <td id="t_ventas" className="textright">100.00</td>
                          <td id="t_ventas" className="textright">100.00</td>
                          <td id="t_ventas" className=""><a className="link_delate" href="#" onclick= "event.preventDefault(); del_product_detalle(1);"><i className="far fa-trash-alt"></i>Eliminar</a></td>
                      </tr>

                      <tr>
                          <td>1002</td>
                          <td id="t_ventas" colspan="2">Camisas</td>
                          <td id="t_ventas" className="textcenter">1</td>
                          <td id="t_ventas" className="textright">150.00</td>
                          <td id="t_ventas" className="textright">100.00</td>
                          <td id="t_ventas" className=""><a className="link_delate" href="#" onclick= "event.preventDefault(); del_product_detalle(1);"><i className="far fa-trash-alt"></i></a>
                          </td>
                      </tr>
                  </tbody>
                  <tfoot>
                      <tr>
                          <td id="t_ventas" colspan="5" className="textright">Total </td>
                          <td id="t_ventas" className="textright">1000.00</td>
                      </tr>
                  </tfoot>
              </table>
            </section>
            <br/>
            <br/>
            <div className="botonesVenta">
                <a href="#" className="btn_new" id="btn_facturar_venta"><i className="fas fa-edit"></i>Procesar</a>
                <a href="#" className="btn_ok" id="btn_anular_venta"><i className="fas fa-ban"></i>Anular</a>
            </div>
        <Footer/>
    </div>
    );
};

export default Ventas;
