
var dataCompleta={}
var amazingEvents=[]
var impresionHtml =document.getElementById("eventosProximos")

function fetchData(){
    fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
    .then(data=>data.json())
    .then(data=>{
        amazingEvents.push(...data.eventos)
        dataCompleta=data

        eventosFuturos(amazingEvents)
    })
   
    
}


fetchData()




function eventosFuturos(){
    
    //FILTER SE USA PARA EVALUAR BOOLEANOS NO EVALUA OPERACIONES/MAP SE USA PARA EVALUAR OPERACIONES 
    var eventosF= amazingEvents.filter(cartaArray=>cartaArray.date>dataCompleta.fechaActual)
    impresionHtml.innerHTML=""
    
    eventosF.map(cadaTarjeta=>{
        
        impresionHtml.innerHTML +=


        
        `
        <div class="card preview_eventos" style="width: 30rem;">
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
    

}


