// chequea que mano se esta jugando
function checkManoActual(){

        let mesaJugador= JSON.parse(localStorage.getItem('cartasMesaJugador'));
        let mesaPC = JSON.parse(localStorage.getItem('cartasMesaPC'));

        // cambia la mano bajo la condicion de que jugador y PC 
        // jugaron igual cantidad de cartas y que no sea 0
        if ((mesaJugador.length == mesaPC.length) &&
            (mesaJugador.length > 0 || mesaPC.length > 0)){
      
            let nuevaManoActual;
      
            switch (mesaJugador.length){
              // de primera a segunda,
              case 1:
                nuevaManoActual = `segunda`;
                setBotonesNoMasEnvido();
                break;
                // o de segunda a tercera
              case 2:
                nuevaManoActual = `tercera`;
                break;
            }
            
            localStorage.setItem('manoActual', nuevaManoActual);
            writeLog(`Se pasa a ${nuevaManoActual} mano.`);

        }
        
}   

// indica de quien sigue jugando, 
// si alguno ya gana la ronda indica 'fin-ronda'
function checkQuienJuega(){

  // guarda en variable: quien gano Primera y Segunda
  let deQuienEsPrimera = localStorage.getItem('deQuienEsPrimera');
  let deQuienEsSegunda = localStorage.getItem('deQuienEsSegunda');

  // guarda en variable: quien es Mano
  let quienEsMano = localStorage.getItem('quienEsMano');

  // guarda en variable: arrays de mesas de Jugador y PC
  let mesaJugador = JSON.parse(localStorage.getItem('cartasMesaJugador'));
  let mesaPC = JSON.parse(localStorage.getItem('cartasMesaPC'));
  let quienJuega;
  
  // - si hay mano completa, mesas.lenght = 1, 2, 3 - 
  if ((mesaJugador.length == mesaPC.length) 
  && (mesaPC.length > 0 || mesaJugador.length > 0) ){

    let manoLength = mesaJugador.length;

    // se fija en que mano estan
    switch (manoLength){

      // primera
      case 1: 

        if (deQuienEsPrimera == 'parda'){          
          // si primera parda, juega quien es mano
          quienJuega = quienEsMano;
        }else{
          // si primera no es parda, juega quien gano primera
          quienJuega = deQuienEsPrimera;
        }

        break;
       
      // segunda
      case 2:
        
        // si segunda es PARDA 
        if (deQuienEsSegunda == 'parda') {

          // si primera tambien es PARDA
          if (deQuienEsPrimera == 'parda'){ 

            // juega el que es mano
            quienJuega = quienEsMano;
          
          // si primera NO parda (pero si segunda)
          }else{

            // gana el que gano primera, entonces
            quienJuega = 'fin-ronda';

          }
        
        // si la segunda no es PARDA
        }else{

          // pero la primera si es PARDA
          if (deQuienEsPrimera == 'parda'){

            // gana el que gano segunda
            quienJuega = 'fin-ronda';
          
          // primera NO parda && segunda NO parda
          }else{

            // si quien gano primera y segunda es el mismo
            if(deQuienEsPrimera == deQuienEsSegunda){

              // entonces gana ese, fin de ronda
              quienJuega = 'fin-ronda';

            }else{

              // juega el que gano segunda
              // para definir en tercera
              quienJuega = deQuienEsSegunda;

            }

          }

        }

        break;

      case 3:
        
        // si jugaron tercera, fin de ronda
        quienJuega = 'fin-ronda';
        break;

    }

  // else: si uno de los dos jugadores aun no jugó
  } else {

      // (sin importar de que mano se trate)

      // si el que jugo ya es jugador
      if (mesaJugador.length > mesaPC .length){

        quienJuega = 'PC';
      
      // si el que ya jugo es PC
      }else{

        quienJuega = 'jugador';

      }

  }

  localStorage.setItem('quienJuega', quienJuega);

  if (quienJuega == 'PC'){
    let nombrePC = localStorage.getItem('nombrePC');
    writeLog(`Es el turno de ${nombrePC}. Presiona algun CANTO o JUGAR PC para continuar.`);
  }else if(quienJuega == 'jugador'){
    
    writeLog(`Es tu turno. Presiona algun CANTO o juega alguna CARTA para continuar.`);
  

  }else{


  }

  
  return quienJuega;

}

// verifica y establece quien gana cada mano
function checkGanadorManos(){
  
  let mesaJugador = JSON.parse(localStorage.getItem('cartasMesaJugador'));
  let mesaPC = JSON.parse(localStorage.getItem('cartasMesaPC'));
  let ganadorMano='nadie';

  // si jugaron la misma cantidad de cartas
  if((mesaPC.length == mesaJugador.length) && 
     (mesaPC.length > 0 || mesaJugador.length > 0)){

    // si en valor gana la ultima carta de la PC
    if(mesaPC[mesaPC.length-1].valor > 
      mesaJugador[mesaJugador.length-1].valor){
      // pc es ganador de esa mano 
      ganadorMano = 'PC';

      // si en valor gana la ultima carta el jugador
    }else if(mesaPC[mesaPC.length-1].valor < 
      mesaJugador[mesaJugador.length-1].valor){
      // jugador es ganador de esa mano
      ganadorMano = 'jugador';

    // else = valores iguales = mano 'parda'
    }else{

      // la mano queda parda
      ganadorMano = 'parda';

    }

    // dependiendo que mano jugaron, guarda en el storage
    switch (mesaPC.length){

      // case 0 
      // no ocurre por el if((mesaPC.length == mesaJugador.length)
      
      // Si jugaron primera
      case 1:
        localStorage.setItem('deQuienEsPrimera', ganadorMano);
        if(ganadorMano=='PC'){
          let nombrePC = localStorage.getItem('nombrePC');
          writeLog(`${nombrePC} ganó la PRIMERA MANO.`);
        }else if(ganadorMano == 'jugador'){
          writeLog(`Ganaste la PRIMERA MANO.`);
        }else{
          writeLog(`La PRIMER MANO es PARDA.`);
        }
        break;

      // Si jugaron segunda
      case 2:
        localStorage.setItem('deQuienEsSegunda', ganadorMano);
        if(ganadorMano=='PC'){
          let nombrePC = localStorage.getItem('nombrePC');
          writeLog(`${nombrePC} ganó la SEGUNDA MANO.`);
        }else if(ganadorMano == 'jugador'){
          writeLog(`Ganaste la SEGUNDA MANO.`);
        }else{
          writeLog(`La SEGUNDA MANO es PARDA.`);
        }
        break;

      // Si jugaron tercera
      case 3:
        localStorage.setItem('deQuienEsTercera', ganadorMano);
        if(ganadorMano=='PC'){
          let nombrePC = localStorage.getItem('nombrePC');
          writeLog(`${nombrePC} ganó la TERCERA MANO **`);
        }else if(ganadorMano == 'jugador'){
          writeLog(`Ganaste la TERCERA MANO.`);
        }else{
          writeLog(`La TERCERA MANO es PARDA.`);
        }
        break;
    }

  }

}

// verifica quien gana el tanto
// se llama a la funcion al haber un "quiero" o "no quiero"
function checkGanadorTanto(){

  let puntosTantoRondaJugador = JSON.parse(localStorage.getItem('puntosTantoRondaJugador'));
  let puntosTantoRondaPC = JSON.parse(localStorage.getItem('puntosTantoRondaPC'));

  let tantoPC = JSON.parse(localStorage.getItem('tantoPC'));
  let tantoJugador = JSON.parse(localStorage.getItem('tantoJugador'));

  let quienEsMano = localStorage.getItem('quienEsMano');

  let ganadorTanto = '';

  if (tantoPC > tantoJugador){

    ganadorTanto = 'PC';
    puntosTantoRondaJugador = 0;
    
  }else if(tantoPC < tantoJugador){
    
    ganadorTanto = 'jugador';
    puntosTantoRondaPC = 0;
    
  }else if(tantoPC == tantoJugador){
    
    ganadorTanto = quienEsMano;
    
    if (quienEsMano = 'jugador'){
    
      puntosTantoRondaPC = 0;
      
    }else{
      
      puntosTantoRondaJugador = 0;

    }

  }



  localStorage.setItem('puntosTantoRondaJugador', JSON.stringify(puntosTantoRondaJugador));
  localStorage.setItem('puntosTantoRondaPC', JSON.stringify(puntosTantoRondaPC));

  return ganadorTanto;
  
}

// indica si alguien ganó la ronda
// utiliza los valores establecidos en checkGanadorManos()

// es llamada cuando checkQuienJuega() arroja = 'fin-ronda'
// en lugar de 'jugador' o 'PC' como resultados
function checkGanadorRonda(){

  // revisa quien es el ganador de cada mano
  let ganadorPrimera = localStorage.getItem('deQuienEsPrimera');
  let ganadorSegunda = localStorage.getItem('deQuienEsSegunda');
  let ganadorTercera = localStorage.getItem('deQuienEsTercera');

  let quienEsMano = localStorage.getItem('quienEsMano');

  let ganadorRonda;

  // si gano el mismo jugador primera y segunda
  // debe ser != de 'nadie' y != 'parda')
  if(ganadorPrimera == ganadorSegunda){

    // se fija quien es ese ganador
    switch (ganadorPrimera){

      // si es jugador 
      case 'jugador':
        ganadorRonda = 'jugador';
        break;
      
      // si es pc
      case 'PC':
        ganadorRonda = 'PC';
        break;

      // si es el caso que 1ra y 2da son PARDAS
      case 'parda':

        // se fija en tercera quien ganó

        // esta funcion se llama cuando se detecta
        // un fin de ronda desde checkQuienJuega()
        // osea que ganadorTercera != 'nadie'

        switch(ganadorTercera){

          case 'parda':
            ganadorRonda = quienEsMano;
            break;
          
          case 'jugador':
            ganadorRonda = 'jugador';
            break;

          case 'PC':
            ganadorRonda = 'PC';
            break;

        }

      

    }

  // si ganadorPrimera != ganadorSegunda
  }else{

    // si son distintos y no parda, entonces ganaron 1 mano cada uno
    if (ganadorPrimera != 'parda' && ganadorSegunda != 'parda'){

        // si tercera es parda, gana primera
        if (ganadorTercera == 'parda'){

          ganadorRonda = ganadorPrimera;
        
        }else{

          ganadorRonda = ganadorTercera;

        }

    // si primera parda y segunda NO parda
    }else if ((ganadorPrimera == 'parda') && (ganadorSegunda != 'parda')){

      ganadorRonda = ganadorSegunda;
    
    // si primera NO parda y segunda parda
    }else if ((ganadorPrimera != 'parda') && (ganadorSegunda == 'parda')){

      ganadorRonda = ganadorPrimera;

    // si primera = parda y segunda = parda
    }else if ((ganadorPrimera == 'parda') && (ganadorSegunda == 'parda')){

      // gana tercera, si no es parda
      if (ganadorTercera != 'parda'){
        
        ganadorRonda = ganadorTercera;
      
      //pero si es parda tambien tercera, gana la mano 
      }else{

        ganadorRonda = quienEsMano;

      }

    }

  }

  localStorage.setItem('deQuienEsLaRonda', ganadorRonda);

  return ganadorRonda;
  
}

function checkGanadorPartida(){
  
  let puntosJugador = JSON.parse(localStorage.getItem('puntosJugador'));
  let puntosPC = JSON.parse(localStorage.getItem('puntosPC'));
  let nombrePC = localStorage.getItem('nombrePC');

    
  if (puntosJugador == 30){
    writeLog(`¡Ganaste la partida!.`);
    alert(`¡Ganaste la partida!.`);
    setBotonesFinPartida();

  }else if (puntosPC == 30){
    writeLog(`¡${nombrePC} gana la partida!.`);
    alert(`¡${nombrePC} gana la partida!.`);
    setBotonesFinPartida();

  }
  
}

function finDeRonda(){

  //  obtiene al ganador de la ronda
  let ganadorRonda = localStorage.getItem('ganadorRonda');

  // si aun no esta definido (un 'no quiero'), lo busca:
  if (ganadorRonda == 'nadie'){
    ganadorRonda = checkGanadorRonda();
  }

  
  // suma los puntos de la ronda al ganador de la ronda
  sumarPuntosRonda(ganadorRonda, valorPuntosRonda());
  
  // suma al total de puntos de la ronda al total de PC y Jugador
  sumarPuntosPartida();
  
  // muestra los puntos finales como quedarian
  mostrarPuntos();
  
  let nombrePC = localStorage.getItem('nombrePC');
  
  let puntosPC = JSON.parse(localStorage.getItem('puntosPC'));
  let puntosRondaPC = JSON.parse(localStorage.getItem('puntosRondaPC'));
  
  let puntosJugador = JSON.parse(localStorage.getItem('puntosJugador'));
  let puntosRondaJugador = JSON.parse(localStorage.getItem('puntosRondaJugador'));
  
  let puntosTantoRondaJugador = JSON.parse(localStorage.getItem('puntosTantoRondaJugador'));
  let puntosTantoRondaPC = JSON.parse(localStorage.getItem('puntosTantoRondaPC'));
  
  
  if(ganadorRonda=='PC'){
    writeLog(`${nombrePC} ganó la RONDA.`);
  }else{
    writeLog(`Ganaste la RONDA.`);
  }
  
  writeLog(`Esta ronda sumás ${puntosTantoRondaJugador} puntos por el tanto y ${puntosRondaJugador} puntos por la mano.  Tu puntualción total es ${puntosJugador} puntos.`);
  writeLog(`${nombrePC} suma ${puntosTantoRondaPC} puntos por el tanto y ${puntosRondaPC} puntos por la mano.  Su puntualción total es ${puntosPC} puntos.`);
  
  alert('Fin de Ronda. Presiona aceptar para continuar.');

  // limpia mesas y manos
  limpiarMesas();
  limpiarManos();
  
  // inicializa el storage para la siguiente ronda
  storageInitNuevaRonda();


  // enable/disable de botones
  setBotonesNuevaRonda();

  // disable mano jugador
  disableManoJugador('fin de ronda')

  // verifica si alguien ganó la partida
  checkGanadorPartida();

}




// funciones relacionadas con el log del juego

// escribe el log
function writeLog(contentParam){
  let ulLog = document.getElementById('ul-log');
  ulLog.innerHTML += `<li>${contentParam}</li>`;
  localStorage.setItem('logContent', ulLog.innerHTML);
  updateLogScroll();
}

// borra el log
function clearLogContent(){
  let ulLog = document.getElementById('ul-log');
  ulLog.innerHTML = ``;
  localStorage.setItem('logContent', ``);
}

// recallea el log al cargar
function recallLogContent(){
  let logContent = localStorage.getItem('logContent');
  if (logContent != null){writeLog(logContent);}
}

// scrolea hasta abajo el log
function updateLogScroll(){
  let log = document.getElementById('ul-log');
  log.scrollTop = log.scrollHeight;
}

