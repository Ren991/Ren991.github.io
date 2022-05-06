var datoMaximo=document.getElementById("datoMayor")

var amazingEvents=[]
var menor=document.getElementById("datoMenor")
async function getData(){
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos") 
        .then(response => response.json()) 
        .then((json) => {
            amazingEvents.push(...json.eventos);
          });
    // primeraTabla()/
primerTabla()
SegundaTabla()

    }
getData()


var tablaUno=[]
var categorias=[]


 var impresionHtml =document.getElementById("impresionPrimerTabla")
var datosCategoria=[]
var ingresosCategoria=[]
var ingresoTotalxCategoria=[]

var porcentajeAsistenciaCategoria=[]
var porcentajeTotal=[]


 function primerTabla(){
    
var unique =amazingEvents.map(item=>item.category)
const quitoRepetidas = new Set(unique)
categorias = [...quitoRepetidas]
 
 console.log(categorias)

 categorias.map(nombre=>{
   
  datosCategoria.push({ 
      categoria:nombre, 
      data:amazingEvents.filter(datos => datos.category === nombre)}) 
})
console.log(datosCategoria);

//INGRESO CATEGORIAS
datosCategoria.map(datos=>{
  ingresosCategoria.push({
    ingresos:datos.data.map(item=> item.assistance*item.price||item.estimate*item.price),
    
  })
  })

console.log(ingresosCategoria);
var gananciasIngreso=[]

gananciasIngreso.push(...ingresosCategoria.map(cadaElemento=>cadaElemento.ingresos))

  var reductor=(valorInicial,valorActual)=>parseFloat (valorInicial)+parseFloat(valorActual)

  console.log(gananciasIngreso);

let ganancias= gananciasIngreso.map(elemento=>{
  
  return elemento.reduce(reductor,0);
  
})
console.log(ganancias);

//PROMEDIOS ASISTENCIA

datosCategoria.map(datos=>{
  porcentajeAsistenciaCategoria.push({
    promedioAsistencia:datos.data.map(item=> parseFloat(((( item.assistance || item.estimate)*100) / item.capacity).toFixed(2))),
    categoria:datos.categoria
  })
  })

console.log(porcentajeAsistenciaCategoria[0].promedioAsistencia);
var todosPromedioPorcent=[]

todosPromedioPorcent.push(...porcentajeAsistenciaCategoria.map(cadaElemento=>cadaElemento.promedioAsistencia))

  var reductor=(valorInicial,valorActual)=>parseFloat (valorInicial)+parseFloat(valorActual)

  console.log(todosPromedioPorcent);

let datosFiltrados= todosPromedioPorcent.map(elemento=>{
  
  return parseFloat((elemento.reduce(reductor,0)/elemento.length).toFixed(2));
  
})
console.log(datosFiltrados);

for (let i = 0; i < categorias.length; i++) {
  tablaUno.push([{nombre:categorias[i]},{ingresos:ganancias[i]},{promedioAsistencia:datosFiltrados[i]}]);
  
}
       
console.log(tablaUno);

tablaUno.map(cadaElemento=>{
  impresionHtml.innerHTML+=
  `
  <tr>
  <td>${cadaElemento[0].nombre}</td>
  <td>${cadaElemento[1].ingresos}</td>
  <td>${cadaElemento[2].promedioAsistencia}</td>
  </tr>
  
  `
})
}
var impresionHtmlDos=document.getElementById("impresionSegundaTabla")
function SegundaTabla(){
    var tablaDos = []
    var capacidad = []
    var audienciaMayor = []
    var audienciaMenor = []
    var porcentajeAudiencia = []
    
    let capacidadOrdenada=amazingEvents.sort(function(a,b) {    
        return b.capacity-a.capacity;
      }).slice(0,3)

    capacidadOrdenada.map(cadaTarjeta=>{
        capacidad.push({nombre:cadaTarjeta.name,numero:cadaTarjeta.capacity,tipo:"Mayor Capacidad"})
    })
    
    amazingEvents.map(cadaTarjeta=>{
        if(cadaTarjeta.assistance){
          var p = parseInt(((cadaTarjeta.assistance*100)/cadaTarjeta.capacity))
          porcentajeAudiencia.push({nombre:cadaTarjeta.name, porcentajeAudiencia:p.toFixed(2)})
      }else {
          var p = parseInt((cadaTarjeta.estimate*100)/cadaTarjeta.capacity)
          porcentajeAudiencia.push({nombre:cadaTarjeta.name, porcentajeAudiencia:p.toFixed(2)})
      }
      })

      
      let mayorAudiencia=porcentajeAudiencia.sort(function(a,b) {
        return b.porcentajeAudiencia-a.porcentajeAudiencia;
      }).slice(0,3)
      let menorAudiencia=porcentajeAudiencia.sort(function(a,b) {
        return a.porcentajeAudiencia-b.porcentajeAudiencia;
      }).slice(0,3)
    
      
      mayorAudiencia.map(cadaTarjeta=>{
        audienciaMayor.push({nombre:cadaTarjeta.nombre,numero:cadaTarjeta.porcentajeAudiencia,tipo:'Mayor Audiencia'})
      })
      
      menorAudiencia.map(cadaTarjeta=> audienciaMenor.push({nombre:cadaTarjeta.nombre,numero:cadaTarjeta.porcentajeAudiencia,tipo:'Menor Audiencia'}))
      
      tablaDos.push([{tablaDos:capacidad[0]},{tablaDos:audienciaMayor[0]},{tablaDos:audienciaMenor[0]}],
        [{tablaDos:capacidad[1]},{tablaDos:audienciaMayor[1]},{tablaDos:audienciaMenor[1]}],
        [{tablaDos:capacidad[2]},{tablaDos:audienciaMayor[2]},{tablaDos:audienciaMenor[2]}])

      tablaDos.map(item=>{
          impresionHtmlDos.innerHTML+= 
          `<tr>
            <td>${item[1].tablaDos.nombre}: ${item[1].tablaDos.numero}%</td>
            <td>${item[2].tablaDos.nombre}: ${item[2].tablaDos.numero}%</td>
            <td>${item[0].tablaDos.nombre}: ${item[0].tablaDos.numero}</td>
          </tr>
          `
      })
      console.log(tablaDos)
      
}





