var lugar = document.getElementById("selectOption")
var eventosAmazing=[]
var seleccionDeTarjeta="primera"
var ingresoDelUsuario=""

async function getEvents(){
await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")//fetch carga la base de datos
.then(respuesta=>respuesta.json())

.then(json=>eventosAmazing.push(...json.eventos))


muestraDeTarjetas()




}

getEvents()
//Busco el elemento html y lo guardo en una variable.

var searchingInput=document.querySelector("#searchInput")

//Escuchar el evento de keyup

searchingInput.addEventListener("keyup",search)

//Creamos la funcion para mostrar las cardBuscadas

var data=[]

 console.log(seleccionDeTarjeta);

 
 function search(event){ //Se va a ocupar de buscar y filtrar los datos del array de paises que se encuntra en el archivo datos.js
 let val=event.target.value;
   
data=eventosAmazing.filter(cartasAe=>cartasAe.name.toLowerCase().includes(val.toLowerCase()))
   
console.log(event)    
console.log(data)    
muestraDeTarjetas(data)//IMPRESION DE TARJETAS EN EL INICIO
}


var arrayTarjetas=[]
 var impresionHtml =document.getElementById("impresionTarjetas")

 function muestraDeTarjetas(data){

 // Define un array que va a contener la informacion de todos los eventos
//Planteamos un condicional para ver que eventos/tarjetas se cargan en el array.
if(data==undefined){ //Si el usario no ingresa nada en el input
    arrayTarjetas.push(...eventosAmazing)//Tenemos que poner eventos(donde esta el array)
}else{
    arrayTarjetas.push(...data)
 
}
console.log(arrayTarjetas);
console.log(eventosAmazing);



 impresionHtml.innerHTML="" //Defino variable que va a contener la impresion de las cards en el html

arrayTarjetas.map(cadaTarjeta=>{
    impresionHtml.innerHTML +=
    
    `
    <div class="card preview_eventos " style="width: 25rem;">
    <article class="eventos"  >
    <img class="card-img-top img_tarjeta" src="${cadaTarjeta.image}" alt="${cadaTarjeta.name}">
    <div class="card-body">
      <h5 class="card-title">${cadaTarjeta.name}</h5>
      
      <p class="card-text">${cadaTarjeta.description}</p>
      <a href="./detalle.html?id=${cadaTarjeta.id}" class="btn btn-primary">ver mas</a>
      </div>
      </article>
      </div>



    
    `
      
 

})


arrayTarjetas=[]

}
//function select
function select(event){         //LE ASIGNO COMO PARAMETRO EL EVENTO       
    
   var eventoSeleccionado=event.target.value        //DECLARO EL VALOR DEL EVENTO EN UNA NUEVA VARIABLE
   todosLosSelect=eventoSeleccionado
   var data=[]
   
if(ingresoDelUsuario!==""){


 if(eventoSeleccionado=="primera"){
   data.push(...eventosAmazing.filter
    (cartasAe=>cartasAe.caetgory.toLowerCase().toLowerCase.
    includes(ingresoDelUsuario.toLowerCase()))) 


 }else{
 data.push(...eventosAmazing.filter(
    cartasAe=>cartasAe.category===eventoSeleccionado&&
cartasAe.category.toLowerCase().includes
(ingresoDelUsuario.toLowerCase())))
}



}else{
    if(eventoSeleccionado==="primera"){
        data.push(...eventosAmazing)
    }else{
        data.push(...eventosAmazing.filter(cartasAe=>
cartasAe.category===eventoSeleccionado))
    }

 }
   muestraDeTarjetas(data)
}
lugar.addEventListener("change",select) 
