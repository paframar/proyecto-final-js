function storageInitNuevaRonda(){

  let cartasManoJugador = [];
  let cartasManoPC = [];
  let cartasMesaJugador = [];
  let cartasMesaPC = [];

  // vectores de objeto Naipe, manos y mesas, de JUGADOR y PC
  localStorage.setItem(`cartasManoJugador`, JSON.stringify(cartasManoJugador));
  localStorage.setItem(`cartasMesaJugador`, JSON.stringify(cartasMesaJugador));
  localStorage.setItem(`cartasManoPC`, JSON.stringify(cartasManoPC));
  localStorage.setItem(`cartasMesaPC`, JSON.stringify(cartasMesaPC));

   // numero de rondas + 1
   let rondaNumero = JSON.parse(localStorage.getItem('rondaNumero'));
   localStorage.setItem(`rondaNumero`, (rondaNumero+1));
   writeLog(`- - - - - - - RONDA #${rondaNumero+1} - - - - - - -`);

  // cambia de mano
  let quienEsMano = localStorage.getItem('quienEsMano');
  let nombrePC = localStorage.getItem('nombrePC');

  if (quienEsMano == 'jugador'){
    
    
    // indica de quien es el turno actual
    localStorage.setItem(`quienJuega`, `PC`);
    
    localStorage.setItem(`quienEsMano`, `PC`);
    localStorage.setItem(`quienEsPie`, `jugador`);

    writeLog(`Esta ronda ${nombrePC} es mano y comenzará jugando.`);
    
    // si el que es mano es PC
  }else{
    
    localStorage.setItem(`quienEsMano`, `jugador`);
    
    // indica de quien es el turno actual
    localStorage.setItem(`quienJuega`, `jugador`);
    
    localStorage.setItem(`quienEsPie`, `PC`);
    
    writeLog('Esta ronda sos mano, comenzás jugando.');

  }
  
  writeLog('Presiona REPARTIR CARTAS para comenzar.');
 
  localStorage.setItem(`ganadorRonda`, `nadie`);

  // array de primeros cantos: envido, real envido, falta envido, quiero, no quiero
  let primerosCantos = [];
  localStorage.setItem('primerosCantos', JSON.stringify(primerosCantos));

  // indica si la ronda esta en 'truco', 'retruco' o 'vale 4'
  localStorage.setItem(`segundoCanto`, `no cantado`);


  // status de quien gano cada mano
  localStorage.setItem(`deQuienEsPrimera`, `nadie`);
  localStorage.setItem(`deQuienEsSegunda`, `nadie`);
  localStorage.setItem(`deQuienEsTercera`, `nadie`);
  localStorage.setItem(`deQuienEsLaRonda`, `nadie`);

  // establece quien tiene el quiero primero (envio, real envio, falta envido)
  localStorage.setItem(`deQuienEsElQuieroPrimero`, `nadie`);

  // establece quien tiene el quiero segundo (truco, retruco, vale 4)
  localStorage.setItem(`deQuienEsElQuieroSegundo`, `nadie`);


  localStorage.setItem(`puntosRondaJugador`, 0);
  localStorage.setItem(`puntosRondaPC`, 0);

  localStorage.setItem(`puntosTantoRondaJugador`, 0);
  localStorage.setItem(`puntosTantoRondaPC`, 0);

  // indica la mano actual que se esté jugando (primera, segunda o tercera)
  localStorage.setItem(`manoActual`, `primera`);

  // guarda status por defecto de los botones
  localStorage.setItem(`statusBtnNuevoJuego`, `on`);
  localStorage.setItem(`statusBtnJugarPC`, `off`);
  localStorage.setItem(`statusBtnRepartirCartas`, `on`);
  localStorage.setItem(`statusBtnRetirarse`, `off`);
  
  localStorage.setItem(`statusBtnTruco`, `off`);
  localStorage.setItem(`statusBtnRetruco`, `off`);
  localStorage.setItem(`statusBtnVale4`, `off`);

  localStorage.setItem(`statusBtnEnvido`, `off`);
  localStorage.setItem(`statusBtnRealEnvido`, `off`);
  localStorage.setItem(`statusBtnFaltaEnvido`, `off`);

  mostrarNombrePC();

}

function storageInfoInit(){

  localStorage.clear();

  let cartasManoJugador = [];
  let cartasManoPC = [];
  let cartasMesaJugador = [];
  let cartasMesaPC = [];

  // vectores de objeto Naipe, manos y mesas, de JUGADOR y PC
  localStorage.setItem(`cartasManoJugador`, JSON.stringify(cartasManoJugador));
  localStorage.setItem(`cartasMesaJugador`, JSON.stringify(cartasMesaJugador));
  localStorage.setItem(`cartasManoPC`, JSON.stringify(cartasManoPC));
  localStorage.setItem(`cartasMesaPC`, JSON.stringify(cartasMesaPC));

  // indica quien gana la ronda
  localStorage.setItem(`ganadorRonda`, `nadie`);

  // numero de rondas de 3 manos que se llevan jugando
  localStorage.setItem(`rondaNumero`, 1);

  // indica quien empieza a jugar
  localStorage.setItem(`quienEsMano`, `jugador`);
  localStorage.setItem(`quienEsPie`, `PC`);

  // indica de quien es el turno actual
  localStorage.setItem(`quienJuega`, `jugador`);

  // indica si la ronda esta en 'truco', 'retruco' o 'vale 4'
  localStorage.setItem(`segundoCanto`, `no cantado`);

    // array de primeros cantos
    let primerosCantos = [];
    localStorage.setItem('primerosCantos', JSON.stringify(primerosCantos));
  

  // status de quien gano cada mano
  localStorage.setItem(`deQuienEsPrimera`, `nadie`);
  localStorage.setItem(`deQuienEsSegunda`, `nadie`);
  localStorage.setItem(`deQuienEsTercera`, `nadie`);
  localStorage.setItem(`deQuienEsLaRonda`, `nadie`);

  // establece quien tiene el quiero primero (envio, real envio, falta envido)
  localStorage.setItem(`deQuienEsElQuieroPrimero`, `nadie`);

  // establece quien tiene el quiero segundo (truco, retruco, vale 4)
  localStorage.setItem(`deQuienEsElQuieroSegundo`, `nadie`);

  // puntos
  localStorage.setItem(`puntosJugador`, 0);
  localStorage.setItem(`puntosPC`, 0);
  localStorage.setItem(`puntosRondaJugador`, 0);
  localStorage.setItem(`puntosRondaPC`, 0);

  // cuantos puntos de tanto se disputan en la ronda
  // (se diferencian por el falta envido)
  localStorage.setItem(`puntosTantoRondaJugador`, 0);
  localStorage.setItem(`puntosTantoRondaPC`, 0);

  localStorage.setItem(`tantoJugador`, 0);
  localStorage.setItem(`tantoPC`, 0);

  localStorage.setItem(`nombrePC`, "");
  
  // indica la mano actual que se esté jugando (primera, segunda o tercera)
  localStorage.setItem(`manoActual`, `primera`);

  // guarda status por defecto de los botones
  localStorage.setItem(`statusBtnNuevoJuego`, `on`);
  localStorage.setItem(`statusBtnJugarPC`, `off`);
  localStorage.setItem(`statusBtnRepartirCartas`, `off`);
  localStorage.setItem(`statusBtnRetirarse`, `off`);
  
  localStorage.setItem(`statusBtnTruco`, `off`);
  localStorage.setItem(`statusBtnRetruco`, `off`);
  localStorage.setItem(`statusBtnVale4`, `off`);

  localStorage.setItem(`statusBtnEnvido`, `off`);
  localStorage.setItem(`statusBtnRealEnvido`, `off`);
  localStorage.setItem(`statusBtnFaltaEnvido`, `off`);

  // contenido del log
  clearLogContent();
  localStorage.setItem(`logContent`, ``);

  
  // genera el nombre de la PC
  generarNombrePC();  

}





