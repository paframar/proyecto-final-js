function sumarPuntosPartida(){
  // suma los puntos que llevan acumulados jugador y maquina

  let puntosPC = JSON.parse(localStorage.getItem('puntosPC'));
  let puntosJugador = JSON.parse(localStorage.getItem('puntosJugador'));
  
  let puntosRondaPC = JSON.parse(localStorage.getItem('puntosRondaPC'));
  let puntosRondaJugador = JSON.parse(localStorage.getItem('puntosRondaJugador'));
  
  let puntosTantoRondaPC = JSON.parse(localStorage.getItem('puntosTantoRondaPC'));
  let puntosTantoRondaJugador = JSON.parse(localStorage.getItem('puntosTantoRondaJugador'));

  puntosPC += (puntosRondaPC + puntosTantoRondaPC);
  puntosJugador += (puntosRondaJugador + puntosTantoRondaJugador);
  
  if (puntosPC > 30){puntosPC = 30};
  if (puntosJugador > 30){puntosJugador = 30};

  localStorage.setItem('puntosJugador', JSON.stringify(puntosJugador));
  localStorage.setItem('puntosPC', JSON.stringify(puntosPC));
  localStorage.setItem('puntosRondaJugador', JSON.stringify(puntosRondaJugador));
  localStorage.setItem('puntosRondaPC', JSON.stringify(puntosRondaPC));
  
}

function mostrarPuntos(){

   // lee puntos del jugador
   let puntosJugador = JSON.parse(localStorage.getItem('puntosJugador'));

   // recorro los td-puntos y los de imagenes
    for ( let x = 1 ; x <= 6 ; x++){
      
      let tdPuntosJugador = document.getElementById(`td-puntos-${x}-jugador`);

      if (tdPuntosJugador.childElementCount > 0){
         
        for (let j = 0 ; j < tdPuntosJugador.childElementCount; j++){
            
            tdPuntosJugador.removeChild(tdPuntosJugador.childNodes[j]);
         
          }
      }

    }
    
    let cuadraditosCompletosJugador = parseInt(puntosJugador / 5);

    
    // si tiene cuadraditos completos
    if (cuadraditosCompletosJugador > 0){
      
      // recorre cantidad de cuadraditos completos y agrega imagenes con 5 fosforos
      for (let x = 0 ; x <= cuadraditosCompletosJugador-1 ; x++){
        
        let IMGfosforo = document.createElement('img');
        IMGfosforo.style.height = '40px';
        IMGfosforo.style.width = '40px';
        IMGfosforo.src = `/matches/matches-5.png`;
        
        let tdPuntosJugador = document.getElementById(`td-puntos-${x+1}-jugador`);
        tdPuntosJugador.appendChild(IMGfosforo);
        
      }
      
    }
    
    // luego de colorcar los cuadraditos completos, 
    // coloca el resto, si lo tiene, en el td siguiente al ultimo completo
    let fosforosRestoJugador = puntosJugador % 5;
    
    if(fosforosRestoJugador > 0){
      
      let IMGfosforosResto = document.createElement('img');
      IMGfosforosResto.style.height = '40px';
      IMGfosforosResto.style.width = '40px';
      IMGfosforosResto.src = `/matches/matches-${fosforosRestoJugador}.png`;
      
      let tdResto = document.getElementById(`td-puntos-${cuadraditosCompletosJugador+1}-jugador`);
      tdResto.appendChild(IMGfosforosResto);
      
    }

    
    
    // lee los puntos de la PC
    let puntosPC = JSON.parse(localStorage.getItem('puntosPC'));


    // recorro los td-puntos y los de imagenes
    for ( let x = 1 ; x <= 6 ; x++){
      let tdPuntosPC = document.getElementById(`td-puntos-${x}-pc`);
      if (tdPuntosPC.childElementCount > 0){
        tdPuntosPC.removeChild(tdPuntosPC.childNodes[0]);
      }
    }
    
    // calcula cuadrtaditos completos de la PC
    let cuadraditosCompletosPC = parseInt(puntosPC / 5);

    // calcula fosforos restantes
    let fosforosRestoPC = puntosPC % 5;

    // si tiene cuadraditos completos
    if (cuadraditosCompletosPC > 0){
      
      // recorre cantidad de cuadraditos completos y agrega imagenes con 5 fosforos
      for (let x = 1 ; x <= cuadraditosCompletosPC ; x++){
        
        let tdPuntosPC = document.getElementById(`td-puntos-${x}-jugador`);
        
        let IMGfosforo = document.createElement('img');
        IMGfosforo.style.height = '40px';
        IMGfosforo.style.width = '40px';
        IMGfosforo.src = `/matches/matches-5.png`;
        
        tdPuntosPC.appendChild(IMGfosforo);

      }
      
    }
    
    // luego de colorcar los cuadraditos completos, 
    // coloca el resto, si lo tiene, en el td siguiente al ultimo completo
    
    if(fosforosRestoPC > 0){
      
      let IMGfosforosResto = document.createElement('img');
      IMGfosforosResto.style.height = '40px';
      IMGfosforosResto.style.width = '40px';
      IMGfosforosResto.src = `/matches/matches-${fosforosRestoPC}.png`;
      
      let tdResto = document.getElementById(`td-puntos-${cuadraditosCompletosPC+1}-pc`);
      tdResto.appendChild(IMGfosforosResto);
      
    }
    
}

function sumarPuntosRonda(aQuienParam, puntosParam){

  switch(aQuienParam){

    case 'jugador':

      // guarda los puntos de ronda en el storage
      localStorage.setItem('puntosRondaJugador', JSON.stringify(puntosParam));
      localStorage.setItem('puntosRondaPC', 0);
      break;
      
    case 'PC':
      
      // guarda los puntos de ronda en el storage
      localStorage.setItem('puntosRondaPC',JSON.stringify(puntosParam));
      localStorage.setItem('puntosRondaJugador', 0);
      break;
    }
    
}


function valorPuntosRonda(){

  let segundoCanto = localStorage.getItem('segundoCanto');
  let valorRonda;

  switch(segundoCanto){

    case 'no cantado':
      valorRonda = 1;
      break;   

    case 'truco':
      valorRonda = 2;
      break;   

    case 'retruco':
      valorRonda = 3;
      break;
    
    case 'vale 4':
      valorRonda = 4;
      break;
  }

  return valorRonda;

}

// calcula la cantidad de puntos en disputa por el tanto de Jugador y PC
// Pueden ser distintos para PC y JUG por el caso de falta envido
function valorPuntosTanto(cantoParam){
  
  let puntosTantoRondaJugador = JSON.parse(localStorage.getItem('puntosTantoRondaJugador'));
  let puntosTantoRondaPC = JSON.parse(localStorage.getItem('puntosTantoRondaPC'));
  
  let puntosPC = JSON.parse(localStorage.getItem('puntosPC'));
  let puntosJugador = JSON.parse(localStorage.getItem('puntosJugador'));

  // array que contiene todos los cantos de envido, real envido, falta envido, etc
  let primerosCantos = JSON.parse(localStorage.getItem('primerosCantos'));

  // agrega el canto nuevo que llega
  primerosCantos.push(cantoParam);

  // vuelve a guardarlo en el storage
  localStorage.setItem('primerosCantos', JSON.stringify(primerosCantos));

  // si no es 'quiero' modifica la cantidad de puntos que pueden ganar
  // PC y jugador con el tanto (sino, solo lo registra en el array)
  if(cantoParam != 'quiero'){

    switch(cantoParam){
      
      case 'envido':
        
        puntosTantoRondaJugador += 2;
        puntosTantoRondaPC += 2;
        break;
        
        case 'real envido':
          
          puntosTantoRondaJugador += 3;
          puntosTantoRondaPC += 3;
          break;
          
        case 'falta envido':
          
          // si PC esta en malas, es la partida
          if (puntosPC <= 15){
            puntosTantoRondaJugador = 30;
            // si PC esta en buenas, es la diferencia para ganar
          }else{
            puntosTantoRondaJugador = 30 - puntosPC;
          }
          
          // si Jugador esta en malas, es la partida
          if (puntosJugador <= 15){
            puntosTantoRondaPC = 30;
            // si Jugador esta en buenas, es la diferencia para ganar
          }else{
            puntosTantoRondaPC = 30 - puntosJugador;
          }
          
          break;
          
        case 'no quiero':
          
          // verifica cual es el canto anterior a 'no quiero' en el array
          primerosCantos = JSON.parse(localStorage.getItem('primerosCantos'));
          
          // si es 'no quiero' siempre habra minimo 2 elementos 
          // el canto no querido, es el anteultimo elemento del array
          let cantoNoQuerido = primerosCantos[primerosCantos.length-2];


          // depende el canto que no se quizo
          switch(cantoNoQuerido){
            
            case 'envido':
              puntosTantoRondaJugador -= 1;
              puntosTantoRondaPC -= 1;
              break;
              
            case 'real envido':
              puntosTantoRondaJugador -= 2;
              puntosTantoRondaPC -= 2;
              break;
              
            // en el caso de ser falta envido
            case 'falta envido':
              
              // como los puntos en disputa no son sumatoria de cantos
              // hay que verificar casos:
              
              // puede o ser 'falta envido' + 'no quiero'
              if (primerosCantos.length ==2){
                
                puntosTantoRondaJugador = 1;
                puntosTantoRondaPC = 1;
                
                // o puede ser 'envido' o 'real envido' + 'falta envido' + 'no quiero'
              }else if (primerosCantos.length ==3){
                
                if(primerosCantos[0]=='envido'){
                  
                  // 2 del envido + 1 de falta no querida
                  puntosTantoRondaJugador = 3;
                  puntosTantoRondaPC = 3;
                  
                }else if(primerosCantos[0]== 'real envido'){
                  
                  // 3 del real envido + 1 de falta no querida
                  puntosTantoRondaJugador = 4;
                  puntosTantoRondaPC = 4;
                  
                }
                
              }

              break;
                
          }

          // borra los puntos de tanto de quien rechazó (quien tenia el quiero primero)
          let deQuienEsElQuieroPrimero = localStorage.getItem('deQuienEsElQuieroPrimero');

          if (deQuienEsElQuieroPrimero == 'PC'){
            puntosTantoRondaPC = 0;
          }else{
            puntosTantoRondaJugador = 0;
          }
                    
    }
                  
    // guarda en el Storage los puntos en disputa por tanto de Jugador y PC
    localStorage.setItem('puntosTantoRondaJugador', JSON.stringify(puntosTantoRondaJugador));
    localStorage.setItem('puntosTantoRondaPC', JSON.stringify(puntosTantoRondaPC));

  }
                  
}
                