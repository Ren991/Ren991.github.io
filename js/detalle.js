//CREAMOS FUNCION PARA TRAER LOS DATOS DEL ID

var dataCompleta={}
var amazingEvents=[]
console.log(amazingEvents)
async function getData(){//la funcion getData es la encargada de recolectar el dato de nuestro archivo json, esta declarada asincrona (async), para poder determinarle el metodo await
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos") //mediante el metodo fetch podes obtener la informacion datos en formato JSON, tanto desde carpetas locales como remotas (APIREST), se declara como await para detener la ejecucion del codigo hasta recibir la respuesta a la promesa realizada por el metodo fetch y asi continuar con el codigo ya con los datos necesarios
        .then(response => response.json())//La respuesta, recibida del metodo fecht es interpretada mediante el metodo json(), esta genera una nueva promersa 
        .then(json =>amazingEvents.push(...json.eventos))//La respuesta a la promesa generada en la ultima linea es recibida y enviada a nuestra variable global paises mediante el metodo push
        
    
     
    //Llamamos a la funcion encaragada de mostrar nuestra nuestros cards en el html para que inicialize y realize el primer renderizado de nuestros cards

    
    console.log(location)
    var id = location.search.split("?id=").filter(Number)
    var selectedId = Number(id[0])
    console.log(selectedId)
    var card = amazingEvents.find(function(muestraDeDetalle){
        return muestraDeDetalle.id == selectedId
        
    })
    var templateHtml = 
    `
    
    <div class="card detalle preview_eventos" style="width: 45rem;">
    <img class="card-img-top img_tarjeta " src="${card.image}" alt="${card.name}">
  <div class="card-body">
  <h2 class="card-title">${card.category}</h2>
  <h2 class="card-title">${card.name}</h2>
  <p class="card-text description_card">${card.description}</p>
  </div>
  <ul class="list-group list-group-flush" preview_eventos>
  <li class="list-group-item">Fecha: ${card.date}</li>
  <li class="list-group-item">Lugar: ${card.place}</li>
  <li class="list-group-item">Precio: $${card.price}</li>
  <li class="list-group-item">Asistencia: ${card.assistance}</li>
  </ul>
  <div class="card-body ">
    <a href="./index.html" class="card-link">Inicio</a>
    <a href="./summary.html" class="card-link">Estadisticas</a>
  </div>
</div>
<div>  
    
    
    
    
    
    
    
    
    
    
    
    
    
    
   
 
    `
    document.querySelector('#impresionDetalle').innerHTML = templateHtml   
}

getData()//llamamos a la funcion getData para que sea inicializada
