// Click - btn-truco
$('#btn-truco').click(function() {
  
  let nombrePC = localStorage.getItem('nombrePC');

  writeLog('Cantaste TRUCO.');

  let respuestaPC = PCresponderCanto('truco');

  switch (respuestaPC){

    case 'quiero':

      localStorage.setItem('segundoCanto', 'truco');

      writeLog(`${nombrePC} aceptó el truco.`);
      setBotonesTruco();
      break;
      
    case 'retruco':

      localStorage.setItem('segundoCanto', 'truco');
      
      if (confirm(`¡${nombrePC} te canta retruco!. ¿Aceptar?.`)){
        setBotonesRetruco();
        localStorage.setItem('segundoCanto', 'retruco');
        writeLog(`Aceptaste el retruco.`);
      }else{
        localStorage.setItem('ganadorRonda', 'PC');
        writeLog(`No aceptaste el retruco.`);
        finDeRonda();
      }
      break;
      
    case 'no quiero':

      writeLog(`${nombrePC} rechazó el truco.`);
      
      localStorage.setItem('ganadorRonda', 'jugador');

      finDeRonda();
      
      break;

  }

});

// Click - btn-retruco
$('#btn-retruco').click(function() {

  let respuestaPC = PCresponderCanto('retruco');

  let nombrePC = localStorage.getItem('nombrePC');

  switch(respuestaPC){

    case 'quiero':
      localStorage.setItem('segundoCanto', 'retruco');
      writeLog(`${nombrePC} aceptó el retruco.`);
      break;
    
    case 'vale 4':
      writeLog(`${nombrePC} quiere vale 4.`);

      // si se acepta el vale 4
      if (confirm(`${nombrePC} quiere vale 4. ¿Aceptas?.`)){

        localStorage.setItem('segundoCanto', 'vale 4');
        writeLog(`Aceptaste el Vale 4.`);
        
      // si no se acepta el vale 4
      }else{

        localStorage.setItem('segundoCanto', 'retruco');

        localStorage.setItem('ganadorRonda', 'PC');
        writeLog(`No aceptaste el Vale 4.`);
        finDeRonda();
      }
      break;
    
    case 'no quiero':

      localStorage.setItem('segundoCanto', 'truco');

      localStorage.setItem('ganadorRonda', 'jugador');

      writeLog(`${nombrePC} no aceptó el retruco.`);
      
      finDeRonda();
      
      break;
  }

  setBotonesRetruco();
});

// Click - btn-vale-4
$('#btn-vale-4').click(function() {

  writeLog(`Cantaste Vale 4.`)
  
  let respuestaPC = PCresponderCanto('vale 4');

  let nombrePC = localStorage.getItem('nombrePC');

  if (respuestaPC == 'quiero'){

    writeLog(`${nombrePC} aceptó el vale 4.`);
    
    setBotonesVale4();
    
    localStorage.setItem('segundoCanto', 'vale 4');
    
  }else{
    
    writeLog(`${nombrePC} rechazó el vale 4.`);

    localStorage.setItem('segundoCanto', 'retruco');

    localStorage.setItem('ganadorRonda', 'jugador');
    
    finDeRonda();

  }

});

// Click - btn-envido
$('#btn-envido').click(function(){

  writeLog(`Cantaste ENVIDO.`);
  
  // el quiero es de la PC
  localStorage.setItem('deQuienEsElQuieroPrimero', 'PC');

  // actualiza los puntos en disputa con este nuevo canto
  valorPuntosTanto('envido');

  // obtiene estos puntos en disputa de cada uno
  let puntosTantoRondaJugador = JSON.parse(localStorage.getItem('puntosTantoRondaJugador'));
  let puntosTantoRondaPC = JSON.parse(localStorage.getItem('puntosTantoRondaPC'));
  
  // obtiene los valores de tanto de Jugador y PC (previamente calculados al repartir)
  let tantoJugador =  JSON.parse(localStorage.getItem('tantoJugador'));
  
  let tantoPC =  JSON.parse(localStorage.getItem('tantoPC'));

  // obtiene el nonbre de la PC
  let nombrePC = localStorage.getItem('nombrePC');
  
  // obtiene la respuesta de la PC 
  let respuestaPC = PCresponderCanto('envido');

  // aqui se obtendra llegado el caso el ganador del tanto
  let ganadorTanto = '';

  // aqui se obtendra llegado el caso la respuesta del jugador con un confirm
  let respuestaJugador = '';


  // en base a que responde la PC, hace
  switch(respuestaPC){

    // si acepta el envido
    case 'quiero':

      writeLog(`${nombrePC} acepto el ENVIDO.`)
      
      // agrega al array de primerosCantos
      valorPuntosTanto('quiero');
      
      // obtiene el ganador del tanto
      ganadorTanto = checkGanadorTanto();

      
      if(ganadorTanto == 'jugador'){
        
        puntosTantoRondaJugador = JSON.parse(localStorage.getItem('puntosTantoRondaJugador'));
        
        writeLog(`Ganás el envido con ${tantoJugador} puntos de tanto, y obtiene ${puntosTantoRondaJugador} puntos de tanto a su favor.`);
        
      }else{
        
        puntosTantoRondaPC = JSON.parse(localStorage.getItem('puntosTantoRondaPC'));
        
        writeLog(`${nombrePC} gana el envido con ${tantoPC} puntos de tanto, y obtiene ${puntosTantoRondaPC} puntos de tanto a su favor.`);

      }
    
      break;

    // si canta envido al envido
    case 'envido':

      writeLog(`${nombrePC} cantó ENVIDO a tu envido.`)
        
      // el quiero es del jugador
      localStorage.setItem('deQuienEsElQuieroPrimero', 'jugador');
      
      // suma el valor del nuevo envido cantado por la PC
      valorPuntosTanto('envido');
      
      // si acepta el jugador
      if (confirm(`${nombrePC} canta envido a tu envido. ¿Aceptás?`)){

        writeLog(`Aceptaste el envido + envido.`);

        // guarda en el array de cantos primeros
        valorPuntosTanto('quiero');

        // obtiene el ganador del tanto
        ganadorTanto = checkGanadorTanto();

        if(ganadorTanto == 'jugador'){

          puntosTantoRondaJugador = JSON.parse(localStorage.getItem('puntosTantoRondaJugador'));

          writeLog(`Ganás el envido con ${tantoJugador} puntos de tanto, y obtenés ${puntosTantoRondaJugador} puntos de tanto a su favor.`);
          
        }else{

          writeLog(`Rechazaste el envido + envido.`);

          valorPuntosTanto('no quiero');
          
          puntosTantoRondaPC = JSON.parse(localStorage.getItem('puntosTantoRondaPC'));          
          
          writeLog(`${nombrePC} gana el envido con ${tantoPC} puntos de tanto, y obtiene ${puntosTantoRondaPC} puntos de tanto a su favor.`);

  
        }

      }
      
      break;

    // si canta real envido al envido
    case 'real envido':

      writeLog(`${nombrePC} cantó REAL ENVIDO a tu envido.`)
      
      // el quiero es del jugador
      localStorage.setItem('deQuienEsElQuieroPrimero', 'jugador');
      
      // suma el valor del nuevo real envido cantado por la PC
      valorPuntosTanto('real envido');

      // consulta al jugador si acepta
      respuestaJugador = confirm(`${nombrePC} canta real envido a tu envido. ¿Aceptás?`);
      
      // si acepta
      if (respuestaJugador){

        writeLog(`Aceptaste el envido + real envido.`);

        // guarda en el array de cantos primeros
        valorPuntosTanto('quiero');

        // obtiene el ganador del tanto
        ganadorTanto = checkGanadorTanto();

        if(ganadorTanto == 'jugador'){

          puntosTantoRondaJugador = JSON.parse(localStorage.getItem('puntosTantoRondaJugador'));

          writeLog(`Ganaste el envido con ${tantoJugador} puntos de tanto, y obtiene ${puntosTantoRondaJugador} puntos de tanto a su favor.`);
          
        }else{

          writeLog(`Rechazaste el envido + real envido.`);

          valorPuntosTanto('no quiero');
                    
          puntosTantoRondaPC = JSON.parse(localStorage.getItem('puntosTantoRondaPC'));          
          
          writeLog(`${nombrePC} gana el tanto no querido y obtiene ${puntosTantoRondaJugador} puntos de tanto a su favor.`);

        }

      }
      
      break;

    // si canta falta envido al envido
    case 'falta envido':
      
      // el quiero es del jugador
      localStorage.setItem('deQuienEsElQuieroPrimero', 'jugador');
      
      // suma el valor del nuevo real envido cantado por la PC
      valorPuntosTanto('falta envido');

      // consulta al jugador si acepta
      let respuestaJugador = confirm(`${nombrePC} canta falta envido a tu envido. ¿Aceptás?`);
      
      // si acepta
      if (respuestaJugador){

        writeLog(`Aceptaste el envido + falta envido.`);

        // guarda en el array de cantos primeros
        valorPuntosTanto('quiero');

        // obtiene el ganador del tanto
        ganadorTanto = checkGanadorTanto();

        if(ganadorTanto == 'jugador'){

          puntosTantoRondaJugador = JSON.parse(localStorage.getItem('puntosTantoRondaJugador'));

          writeLog(`Ganaste el envido con ${tantoJugador} puntos de tanto, y obtiene ${puntosTantoRondaJugador} puntos de tanto a su favor.`);
          
        }else{

          writeLog(`Rechazaste el envido + falta envido.`);


          valorPuntosTanto('no quiero');
                    
          puntosTantoRondaPC = JSON.parse(localStorage.getItem('puntosTantoRondaPC'));          
          
          writeLog(`${nombrePC} gana el tanto no querido y obtiene ${puntosTantoRondaJugador} puntos de tanto a su favor.`);

        }

      }
      
      break;
    
    // si no quiere, gana jugador
    case 'no quiero':

      writeLog(`${nombrePC} no acepta el envido.`)

      // guarda en el array de cantos primeros
      valorPuntosTanto('no quiero');

      puntosTantoRondaJugador = JSON.parse(localStorage.getItem('puntosTantoRondaJugador'));
g
      writeLog(`Ganás el tanto no querido y obtenes ${puntosTantoRondaJugador} puntos de tanto a favor.`);
              
      break;
  }

  setBotonesEnvido();

});

// Click - btn-real-envido
$('#btn-real-envido').click(function(){

  writeLog(`Cantaste REAL ENVIDO.`);
  
  // el quiero es de la PC
  localStorage.setItem('deQuienEsElQuieroPrimero', 'PC');

  // actualiza los puntos en disputa con este nuevo canto
  valorPuntosTanto('real envido');

  // obtiene estos puntos en disputa de cada uno
  let puntosTantoRondaJugador = JSON.parse(localStorage.getItem('puntosTantoRondaJugador'));
  let puntosTantoRondaPC = JSON.parse(localStorage.getItem('puntosTantoRondaPC'));
  
  // obtiene los valores de tanto de Jugador y PC (previamente calculados al repartir)
  let tantoJugador =  JSON.parse(localStorage.getItem('tantoJugador'));
  let tantoPC =  JSON.parse(localStorage.getItem('tantoPC'));

  // obtiene el nonbre de la PC
  let nombrePC = localStorage.getItem('nombrePC');
  
  // obtiene la respuesta de la PC 
  let respuestaPC = PCresponderCanto('real envido');

  // aqui se obtendra llegado el caso el ganador del tanto
  let ganadorTanto = '';

  // aqui se obtendra llegado el caso la respuesta del jugador con un confirm
  let respuestaJugador = '';
  

  // en base a que responde la PC, hace
  switch(respuestaPC){

    // si acepta el envido
    case 'quiero':
      
      writeLog(`${nombrePC} acepta tu real envido.`)
      
      // agrega al array de primerosCantos
      valorPuntosTanto('quiero');
      
      // obtiene el ganador del tanto
      ganadorTanto = checkGanadorTanto();

      if(ganadorTanto == 'jugador'){
        
        puntosTantoRondaJugador = JSON.parse(localStorage.getItem('puntosTantoRondaJugador'));
        
        writeLog(`El jugador gana el envido con ${tantoJugador} puntos de tanto, y obtiene ${puntosTantoRondaJugador} puntos de tanto a su favor.`);
        
      }else{
        
        puntosTantoRondaPC = JSON.parse(localStorage.getItem('puntosTantoRondaPC'));
        
        writeLog(`${nombrePC} gana el envido con ${tantoPC} puntos de tanto, y obtiene ${puntosTantoRondaPC} puntos de tanto a su favor.`);

      }
    
      break;

    

    // si canta real envido al real envido
    case 'real envido':

      writeLog(`${nombrePC} canta REAL ENVIDO a tu real envido.`)
      
      // el quiero es del jugador
      localStorage.setItem('deQuienEsElQuieroPrimero', 'jugador');
      
      // suma el valor del nuevo real envido cantado por la PC
      valorPuntosTanto('real envido');

      // si acepta el jugador
      if (confirm(`${nombrePC} canta real envido a tu real envido. ¿Aceptás?`)){

        // guarda en el array de cantos primeros
        valorPuntosTanto('quiero');

        // obtiene el ganador del tanto
        ganadorTanto = checkGanadorTanto();

        if(ganadorTanto == 'jugador'){

          puntosTantoRondaJugador = JSON.parse(localStorage.getItem('puntosTantoRondaJugador'));

          writeLog(`El jugador gana el envido con ${tantoJugador} puntos de tanto, y obtiene ${puntosTantoRondaJugador} puntos de tanto a su favor.`);
          
        }else{

          puntosTantoRondaPC = JSON.parse(localStorage.getItem('puntosTantoRondaPC'));          

          writeLog(`${nombrePC} gana el real envido + real envido, y obtiene ${puntosTantoRondaPC} puntos de tanto a su favor.`);
          
        }
        
      }else{
        
        valorPuntosTanto('no quiero');
        
        writeLog(`Rechazaste el real envido + real envido.`);
        
        writeLog(`${nombrePC} gana el tanto no querido y obtiene ${puntosTantoRondaPC} puntos de tanto a su favor.`);
      }
      
      break;

    // si canta falta envido al envido
    case 'falta envido':
      
      // el quiero es del jugador
      localStorage.setItem('deQuienEsElQuieroPrimero', 'jugador');
      
      // suma el valor del nuevo real envido cantado por la PC
      valorPuntosTanto('falta envido');

      // consulta al jugador si acepta
      let respuestaJugador = confirm(`${nombrePC} canta falta envido a tu real envido. ¿Aceptás?`);
      
      // si acepta
      if (respuestaJugador){

        // guarda en el array de cantos primeros
        valorPuntosTanto('quiero');

        // obtiene el ganador del tanto
        ganadorTanto = checkGanadorTanto();

        if(ganadorTanto == 'jugador'){

          puntosTantoRondaJugador = JSON.parse(localStorage.getItem('puntosTantoRondaJugador'));

          writeLog(`El jugador gana el envido con ${tantoJugador} puntos de tanto, y obtiene ${puntosTantoRondaJugador} puntos de tanto a su favor.`);
          
        }else{

          valorPuntosTanto('no quiero');
                    
          puntosTantoRondaPC = JSON.parse(localStorage.getItem('puntosTantoRondaPC'));          
          
          writeLog(`${nombrePC} gana el tanto no querido y obtiene ${puntosTantoRondaJugador} puntos de tanto a su favor.`);

        }

      }
      
      break;
    
    // si no quiere, gana jugador
    case 'no quiero':

      writeLog(`${nombrePC} rechaza tu canto de real envido.`);

      // guarda en el array de cantos primeros
      valorPuntosTanto('no quiero');

      puntosTantoRondaJugador = JSON.parse(localStorage.getItem('puntosTantoRondaJugador'));

      writeLog(`Ganás el tanto no querido y obtenes ${puntosTantoRondaJugador} puntos de tanto.`);
              
      break;
  }

  setBotonesRealEnvido();
});

// Click - btn-falta-envido
$('#btn-falta-envido').click(function(){

  writeLog(`Cantaste FALTA ENVIDO.`);
  
  // el quiero es de la PC
  localStorage.setItem('deQuienEsElQuieroPrimero', 'PC');

  // actualiza los puntos en disputa con este nuevo canto
  valorPuntosTanto('falta envido');

  // obtiene estos puntos en disputa de cada uno
  let puntosTantoRondaJugador = JSON.parse(localStorage.getItem('puntosTantoRondaJugador'));
  let puntosTantoRondaPC = JSON.parse(localStorage.getItem('puntosTantoRondaPC'));
  
  // obtiene los valores de tanto de Jugador y PC (previamente calculados al repartir)
  let tantoJugador =  JSON.parse(localStorage.getItem('tantoJugador'));
  let tantoPC =  JSON.parse(localStorage.getItem('tantoPC'));

  // obtiene el nonbre de la PC
  let nombrePC = localStorage.getItem('nombrePC');
  
  // obtiene la respuesta de la PC 
  let respuestaPC = PCresponderCanto('real envido');

  // aqui se obtendra llegado el caso el ganador del tanto
  let ganadorTanto = '';

  // aqui se obtendra llegado el caso la respuesta del jugador con un confirm
  let respuestaJugador = '';
  
  // en base a que responde la PC, hace
  switch(respuestaPC){

    // si acepta el envido
    case 'quiero':

      writeLog(`${nombrePC} acepto la FALTA ENVIDO.`)
      
      // agrega al array de primerosCantos
      valorPuntosTanto('quiero');
      
      // obtiene el ganador del tanto
      ganadorTanto = checkGanadorTanto();

      if(ganadorTanto == 'jugador'){
        
        puntosTantoRondaJugador = JSON.parse(localStorage.getItem('puntosTantoRondaJugador'));
        
        writeLog(`El jugador gana el envido con ${tantoJugador} puntos de tanto, y obtiene ${puntosTantoRondaJugador} puntos de tanto a su favor.`);
        
      }else{
        
        puntosTantoRondaPC = JSON.parse(localStorage.getItem('puntosTantoRondaPC'));
        
        writeLog(`${nombrePC} gana el envido con ${tantoPC} puntos de tanto, y obtiene ${puntosTantoRondaPC} puntos de tanto a su favor.`);

      }
    
      break;

    
    // si no quiere, gana jugador
    case 'no quiero':

      writeLog(`${nombrePC} rechazo la FALTA ENVIDO.`)

      // guarda en el array de cantos primeros
      valorPuntosTanto('no quiero');

      puntosTantoRondaJugador = JSON.parse(localStorage.getItem('puntosTantoRondaJugador'));

      writeLog(`El jugador gana el tanto no querido y obtiene ${puntosTantoRondaJugador} puntos de tanto a su favor.`);
              
      break;
  }



  setBotonesFaltaEnvido();
});

// Click - btn-nuevo-juego
$('#btn-nuevo-juego').click(function(){
  
  let preguntaJugarNuevoJuego = confirm("¿Nueva Partida?");

  if (preguntaJugarNuevoJuego){

    // inicializa el storage
    storageInfoInit();

    // clear log
    clearLogContent();
    
    // limpia mesas y manos
    limpiarMesas();
    limpiarManos();
    
    // muestra los puntos (0)
    mostrarPuntos();

    // consulta si quiere ser mano, si dice no, asigna a PC
    let serMano = confirm("¿Querés comenzar jugando?.");
    let rondaNumero = JSON.parse(localStorage.getItem('rondaNumero'));
    writeLog(`- - - - - - - RONDA #${rondaNumero} - - - - - - -`);

    if (serMano == false){
      localStorage.setItem('quienJuega', 'PC');
      localStorage.setItem('quienEsMano', 'PC');
      localStorage.setItem('quienEsPie', 'jugador');
      writeLog(`Esta ronda ${nombrePC} es mano y comenzará jugando.`);
    }else{
      localStorage.setItem('quienJuega', 'jugador');
      localStorage.setItem('quienEsMano', 'jugador');
      localStorage.setItem('quienEsPie', 'PC');
      writeLog('Esta ronda sos mano, comenzás jugando.');
    }
    
    writeLog('Presiona REPARTIR CARTAS para comenzar.');

    // enable/disable de botones
    setBotonesNuevaRonda();
 
  }
    
});
  
// Click - btn-repartir-cartas
$('#btn-repartir-cartas').click(function(){
  
  setBotonesRepartirCartas();
  
  // limpia mesas y manos (Arrays y localstorage)
  limpiarMesas();
  limpiarManos();
  
  repartirCartas();

  calcularTantos();

  mostrarMano('PC');
  mostrarMano('jugador');


  let quienJuega = localStorage.getItem('quienJuega');
  
  switch(quienJuega){

  case 'jugador':

    writeLog(`Es tu turno. Presiona algun CANTO o juega alguna CARTA para continuar.`);
    
    disableButton('btn-jugar-pc');      
    
    enableManoJugador();
    
    break;
    
    case 'PC':
      
      let nombrePC = localStorage.getItem('nombrePC');
      writeLog(`Es el turno de ${nombrePC}. Presiona algun CANTO o JUGAR PC para continuar.`);
      
      enableButton('btn-jugar-pc');      
      
      disableManoJugador();

    break;

  }

  
});

// Click - btn-jugar-pc
$('#btn-jugar-pc').click(function(){
  
  // canta (o no) truco, retruco o vale 4
  PCCantarLoSegundo();

  // hace movimiento de objetos entre 
  // arrays manoPC y mesaPC
  PCJugarCarta();


  // guarda quien gano cada mano cuando corresponde
  checkGanadorManos();
    
  // cambia de mano cuando corresponde
  checkManoActual();

  // muestra la mano de la PC
  mostrarMano('PC');

  // muestra la mesa de la PC
  mostrarMesa('PC');

  // revisa quien juega.
  let quienJuega = checkQuienJuega();
    
  switch(quienJuega){

  // si es 'fin de ronda' alguien ya ganó
  case 'fin-ronda':

    finDeRonda();

    break;

  case 'jugador':
    
    disableButton('btn-jugar-pc');      

    enableManoJugador();

    break;

  case 'PC':
    
    enableButton('btn-jugar-pc');      
    
    disableManoJugador();

    break;

  }
});


// img CARTA JUGADOR
for (let x = 1 ; x <= 3 ; x++ ){

  $(`#carta-jugador-${x}`).click(function(){ 
  
    // juega la carta, la pasa del
    // array manojugador al array mesajugador
    jugarCartaJugador(this.src);

    // deshabilita la ultima IMG de la mano
    disableCard();

    // muestra la mesa del jugador
    mostrarMesa('jugador');

    // muestra la mano del jugador
    mostrarMano('jugador');
    
    // guarda quien gano cada mano cuando corresponde
    checkGanadorManos();
    
    // cambia de mano cuando corresponde
    checkManoActual();

    
    
    // revisa quien juega.
    let quienJuega = checkQuienJuega();
    
    switch(quienJuega){

      // si es 'fin de ronda' alguien ya ganó
      case 'fin-ronda':

        finDeRonda();

        break;

    case 'jugador':
      
      disableButton('btn-jugar-pc');      

      enableManoJugador();

      break;

    case 'PC':
      
      enableButton('btn-jugar-pc');      
      
      disableManoJugador();

      break;

    }


  });
  
}

// DOM ContentLoaded
document.addEventListener('DOMContentLoaded', function(){


  recallBtnsStatus();
  recallLogContent();
  mostrarPuntos();
  mostrarMesa('PC');
  mostrarMesa('jugador');
  mostrarMano('PC');
  mostrarMano('jugador');
  mostrarNombrePC();
  
  let quienJuega = localStorage.getItem('quienJuega');
  if (quienJuega == 'jugador'){
    enableManoJugador();
  }else{
    disableManoJugador();
  }
});


$('#btn-reset').click(function(){

  if (confirm("Esto terminará la partida actual. ¿Resetear Juego?.")){
    storageInfoInit();
    location.reload();
  }

});






