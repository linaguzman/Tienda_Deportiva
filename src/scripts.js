var search_input= document.querySelector("#search_input");

search_input.addEventListener("keyup",function(e){
    var span_item = document.querySelectorAll(".tablaVentasRegistros .idVenta span");
    var search_idventa = e.target.value.toLowerCase();

    span_item.forEach(function(item){
        if(item.textContent.toLowerCase().indexOf(search_idventa) != -1){
            item.closest("li").style.display="block";
        }
        else{
            item.closest("li").style.display="none";
        }
})

});