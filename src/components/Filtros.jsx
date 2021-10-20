
function Filtros() {
    return(
        <div>
        <input
        // ***** código para configurar buscador *******
        //value={busqueda}
        //onChange={(e) => setBusqueda(e.target.value)} 
        className="buscar" placeholder=""/>
        <button className="botonBuscar" type="submit">Buscar</button>
        </div>
    );

}

export default Filtros

