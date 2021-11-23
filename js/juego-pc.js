function PCJugarCarta(){

  let manoActual = localStorage.getItem('manoActual');
  let quienEsMano = localStorage.getItem('quienEsMano');
  let mesaJugador = JSON.parse(localStorage.getItem('cartasMesaJugador'));
  
  let manoPC = JSON.parse(localStorage.getItem('cartasManoPC'));
  let mesaPC = JSON.parse(localStorage.getItem('cartasMesaPC'));

  // juega de la PC (dependiendo la manoActual)
  switch(manoActual){

    // ** PRIMERA MANO **
    case 'primera':

      // si el jugador es mano, entonces ya jugo
      // toca ver si puede matar esa carta 
      if(quienEsMano == 'jugador'){
        
        // busca si tiene una carta mayor en la mano, sino => -1
        let indiceCartaMayor = PCIndiceCartaMayorA(mesaJugador[0].valor);

        // busca si tiene una carta de igual valor en la mano, sino  => -1
        let indiceCartaIgual = PCIndiceCartaIgualA(mesaJugador[0].valor);

        // SI TIENE UNA CARTA DE MAYOR VALOR ***
        if(indiceCartaMayor != -1){
          
          // quita esa carta del vector manoPC
          let cartaMayor = manoPC.splice(indiceCartaMayor, 1);
          
          // la pushea en el vector mesaPC
          mesaPC.push(cartaMayor[0]);
          
        // SI TIENE UNA CARTA DE IGUAL VALOR ***
        }else if(indiceCartaIgual != -1){
          
          // quita esa carta del vector manoPC
          let cartaIgual = manoPC.splice(indiceCartaIgual, 1);

          // la pushea al vector mesaPC
          mesaPC.push(cartaIgual[0]);

        // Si no tiene MAYOR ni IGUAL, juega la **CARTA MAS BAJA**
        }else{
          
          // quita de la mano la carta menor consultando su indice por funcion
          let cartaMenor = manoPC.splice(PCIndiceCartaMenorMano(), 1);
        
          // la pushea en el vector mesaPC
          mesaPC.push(cartaMenor[0]);
                    
        
        }
        


      // si la PC es Mano, juega la carta mas alta
      } else { 

        // quita de la mano la carta mayor consultando su indice por funcion
        let cartaMayor = manoPC.splice(PCIndiceCartaMayorMano(), 1);

        // la pushea en el vector mesaPC
        // posición 0 ya que es un array lo que devuelve splice
        mesaPC.push(cartaMayor[0]);

      }

      break;

    // ** SEGUNDA MANO **
    case 'segunda':

      // ¿Quien gano primera mano?
      let deQuienEsPrimera = localStorage.getItem('deQuienEsPrimera');

      switch(deQuienEsPrimera){
        
        // Si primera mano es *PARDA*, juega la mas alta
        case 'parda':

          // la quita del array manoPC
          let cartaMasAlta = manoPC.splice(PCIndiceCartaMayorMano(), 1);
          
          // y lo agrega en el array mesaPC
          mesaPC.push(cartaMasAlta[0]);

          break;

        // Si primera mano es del *JUGADOR*, el ya jugó segunda
        case 'jugador':

          // entonces PC tiene que ganar si o si

          // busca carta de valor mayor a la jugada por el Jugador en segunda
          let indiceCartaMayorA = PCIndiceCartaMayorA(mesaJugador[1].valor);

          // si tiene esa carta mayor, entonces
          if (indiceCartaMayorA != -1){

            // quita esa carta mayor de la manoPC
            let cartaMayor = manoPC.splice(PCIndiceCartaMayorA(), 1);

            // la pushea al array mesaPC
            mesaPC.push(cartaMayor[0]);
            
          // si no tiene carta mayor, al tener primera perdida
          } else {
            
            // pierde segunda también, pero juega igualmente, la carta mas alta

            // la quita del array manoPC
            let cartaMasAlta = manoPC.splice(PCIndiceCartaMayorMano(), 1);
            
            // y lo agrega en el array mesaPC
            mesaPC.push(cartaMasAlta[0]);

          }

          break;
        
        // Si primera mano es de la ** PC **
        case 'PC':

          // si la carta mas alta, es mayor o igual 
          // a la que usó para ganar primera
          // tira la carta mas baja

          let indiceCartaMayor = PCIndiceCartaMayorMano();

          if (manoPC[indiceCartaMayor].valor >= mesaPC[0].valor){

            // quita la carta mas baja del array de manoPC
            let cartaMenorMano = manoPC.splice(PCIndiceCartaMenorMano(), 1);

            // lo pushea a la mesaPC
            mesaPC.push(cartaMenorMano[0]);
          
            // sino, juega la mas alta
          }else{
            // quita la carta mas alta del array de manoPC
            let cartaMenorMano = manoPC.splice(PCIndiceCartaMayorMano(), 1);

            // lo pushea a la mesaPC
            mesaPC.push(cartaMenorMano[0]);

          }

          break;

      }

      break;

    
    // ** TERCERA MANO **
    case 'tercera':

        let ultimaCarta = manoPC.splice(0, 1);

        // juega su ultima carta
        mesaPC.push(ultimaCarta[0]);
        
        break;
        
  }

  // actualiza el localstorage de mano y mesa PC
  localStorage.setItem('cartasManoPC', JSON.stringify(manoPC));
  localStorage.setItem('cartasMesaPC', JSON.stringify(mesaPC));

}

// devuelve el indice de una carta de igual valor a la del jugador
// si no existe la carta, devuelve -1
function PCIndiceCartaIgualA(valorCartaJugadorParam){


  let indiceCartaIgual = -1;
  let valorCartaIgual = 15;

  let manoPC = JSON.parse(localStorage.getItem('cartasManoPC'));


  for (x = 0 ; x < manoPC.length ; x++){

    // si encuentra en la mano una carta mayor a la del jugador 
    // y a su vez, menor a la que ya tenia como mayor
    if(manoPC[x].valor == valorCartaJugadorParam){
      // guarda el indice
      indiceCartaIgual = x;
    }
    
  }

  // devuelve indice, si no hay carta devolvera -1
  return indiceCartaIgual;

}

// devuelve el indice de la menor carta disponible mayor a la del jugador
function PCIndiceCartaMayorA(valorCartaJugadorParam){

  let indiceCartaMayor = -1;
  let valorCartaMayor = 15;

  let manoPC = JSON.parse(localStorage.getItem('cartasManoPC'));


  for (x = 0 ; x < manoPC.length ; x++){

    // si encuentra en la mano una carta mayor o igual a la del jugador 
    // y a su vez, menor a la que ya tenia como mayor
    if(manoPC[x].valor > valorCartaJugadorParam && manoPC[x].valor < valorCartaMayor){
      // guarda el indice
      indiceCartaMayor = x;
      valorCartaMayor = manoPC[x].valor;
    }
    
  }

  // devuelve indice, si no hay carta devolvera -1
  return indiceCartaMayor;

}

// devuelve el indice de la carta de mayor valor de la mano
function PCIndiceCartaMayorMano(){

  let manoPC = JSON.parse(localStorage.getItem('cartasManoPC'));
    
    let indiceCartaMayor;
    
    for (let x  = 0 ; x < manoPC.length ; x++){
  
      // parto de 0 a comparar los valores de las cartas
      // los 4 tienen valor = 1
      let valorMayor = 0;
  
      // a medida encuentre un valor mayor actualizará 
      // de que valor se trata el indice de esa carta
      if (manoPC[x].valor > valorMayor){
        valorMayor = manoPC[x].valor;
        indiceCartaMayor = x;
      }
  
    }
  
    return indiceCartaMayor;
}

// devuelve el indice de la carta de menor valor de la mano
function PCIndiceCartaMenorMano(){
  
  let manoPC = JSON.parse(localStorage.getItem('cartasManoPC'));
  
  let indiceCartaMenor;
  
  for (let x  = 0 ; x < manoPC.length ; x++){

    // parto de 15 a comparar los valores de las cartas
    // (el ancho de espada tiene valor 14)
    let valorMenor = 15;

    // a medida encuentre un valor menor actualizará 
    // de que carta se trata
    if (manoPC[x].valor < valorMenor){
      valorMenor = manoPC[x].valor;
      indiceCartaMenor = x;
    }

  }

  return indiceCartaMenor;
}

// canta (o no), truco, retruco o vale 4
function PCCantarLoSegundo(){

  let cantoPC;

  let manoActual = localStorage.getItem('manoActual');

  let deQuienEsElQuieroSegundo = localStorage.getItem('deQuienEsElQuieroSegundo');

  let ganadorPrimera = localStorage.getItem('deQuienEsPrimera');
  let ganadorSegunda = localStorage.getItem('deQuienEsSegunda');

  let manoPC = JSON.parse(localStorage.getItem('cartasManoPC'));
  let cartaMayorManoPC = manoPC[PCIndiceCartaMayorMano()];

  let segundoCanto = localStorage.getItem('segundoCanto');

  let nombrePC = localStorage.getItem('nombrePC');

  let random = randomEntre(1, 10);
  

  switch(segundoCanto){

    case 'no cantado':

      // si ganó primera y random > 3
      if (ganadorPrimera == 'PC' && random > 3){
        cantoPC = 'truco';
        localStorage.setItem('deQuienEsElQuieroSegundo', 'jugador');

      // si no gano primera, pero random > 6
      }else if(random > 6){
        cantoPC = 'truco';
        localStorage.setItem('deQuienEsElQuieroSegundo', 'jugador');
      
      // sino no canta nada
      }else{
        cantoPC = null;
      }

      break;

    case 'truco':

      if(deQuienEsElQuieroSegundo == 'PC'){
      
        // si tiene primera mano y una carta mayor a un 2, 90%
        if ((ganadorPrimera == 'PC') && cartaMayorManoPC.valor > 9 && random > 1){
          cantoPC = 'retruco';
          localStorage.setItem('segundoCanto', 'retruco');
          localStorage.setItem('deQuienEsElQuieroSegundo', 'jugador');
        
        // si tiene primera o segunda mano, %60
        }else if ((ganadorPrimera == 'PC' || ganadorSegunda == 'PC' ) && random > 3){
          cantoPC = 'retruco';
          localStorage.setItem('segundoCanto', 'retruco');
          localStorage.setItem('deQuienEsElQuieroSegundo', 'jugador');

        // si primera es de jugador, segunda aun de nadie, %30
        }else if(ganadorPrimera == 'jugador' && ganadorSegunda == 'nadie' && random > 6){
          cantoPC = 'retruco'
          localStorage.setItem('segundoCanto', 'retruco');
          localStorage.setItem('deQuienEsElQuieroSegundo', 'jugador');

        // sino no canta nada
        }else{
          cantoPC = null;
        }
      
      }
      
      break;

    case 'retruco':
      
      if(deQuienEsElQuieroSegundo == 'PC'){

        // si es un 7 de oro o mayor su carta mayor en la mano, 80%
        if (cartaMayorManoPC.valor >= 11 && random > 2){
          cantoPC = 'vale 4';
          localStorage.setItem('deQuienEsElQuieroSegundo', 'jugador');
          
          // si es un 3 (valor 10) o un 2 (valor 9), 50%
        }else if((cartaMayorManoPC.valor == 10 || cartaMayorManoPC.valor == 9) && (random > 5)){
          cantoPC = 'vale 4';
          localStorage.setItem('deQuienEsElQuieroSegundo', 'jugador');
          
          // si es menor a un 2, %20
        }else if ((cartaMayorManoPC.valor < 9 && random > 8)){
          cantoPC = 'vale 4';
          localStorage.setItem('deQuienEsElQuieroSegundo', 'jugador');
          
          // sino, no canta
        }else{
          cantoPC = null;
        }
      
      }

      break;
        
  }
      
  if (cantoPC != null){
        
        // si acepta el canto
        if (confirm(`${nombrePC} dice: "${cantoPC}". ¿Querés?`)){

          localStorage.setItem('segundoCanto', cantoPC);
          
          switch(cantoPC){

            case 'truco':
              setBotonesTruco();
              break;

            case 'retruco':
              setBotonesRetruco();
              break;
            
            case 'vale 4':
              setBotonesVale4();
              break;
          }

        // si no acepta
        }else{
          localStorage.setItem('ganadorRonda', 'PC');
          finDeRonda();
        }

  }

  if (cantoPC != null){
    writeLog(`${nombrePC} te canta ${cantoPC}.`);
  }


}

// responde a los cantos que efectua el jugador
// dependiendo del tanto o las cartas que tenga en la mano
// hay cierta probabilidad - tambien puede llegar a "mentir"

function PCresponderCanto(cantoParam){

  let respuesta;
  let random = randomEntre(1, 10);

  let manoPC = JSON.parse(localStorage.getItem('cartasManoPC'));
  let nombrePC = localStorage.getItem('nombrePC');

  let cartaMayorManoPC = manoPC[PCIndiceCartaMayorMano()].valor;
  let tantoPC = localStorage.getItem('tantoPC');
  
  switch(cantoParam){

    case 'envido':

      // si tiene mas de 28, 90%
      if (tantoPC > 28 && random > 1){
        respuesta = 'real envido';
        localStorage.setItem('deQuienEsElQuieroPrimero', 'jugador');

      // si tiene mas de 27, 80%
      }else if (tantoPC > 27 && random > 2){
        respuesta = 'envido';
        localStorage.setItem('deQuienEsElQuieroPrimero', 'jugador');

      // si tiene igual o mas que 25, 90%
      }else if (tantoPC >= 25 && random > 2){
        respuesta = 'quiero';
        localStorage.setItem('deQuienEsElQuieroPrimero', 'PC');

        // si tiene mas de 22, 60%
      }else if(tantoPC > 22 && random > 4){
        respuesta = 'quiero';
        localStorage.setItem('deQuienEsElQuieroPrimero', 'PC');

        // si tiene mas de 20, 30%
      }else if(tantoPC > 20 && random > 7){
        respuesta = 'quiero';
        localStorage.setItem('deQuienEsElQuieroPrimero', 'PC');

      // miente el quiero, 10%
      }else if (random > 9){
        respuesta = 'quiero';
        localStorage.setItem('deQuienEsElQuieroPrimero', 'PC');

      }else{
        respuesta = 'no quiero';

      }

      break;

    case 'real envido':

      // si tiene 30 o mas de tanto, 60%
      if (tantoPC >= 30 && random > 4){
        respuesta = 'falta envido';
        localStorage.setItem('deQuienEsElQuieroPrimero', 'jugador');

      // si tiene 29 o mas, 90%
      }else if(tantoPC >= 29 && random > 1){
        respuesta = 'real envido';
        localStorage.setItem('deQuienEsElQuieroPrimero', 'jugador');
      
      // si tiene 28-26 o menos, 70%
      }else if(tantoPC<=28 && tantoPC > 26 && random > 3){
        respuesta = 'real envido';
        localStorage.setItem('deQuienEsElQuieroPrimero', 'jugador');
      
      // si tiene mas de 26, 30%
      }else if(tantoPC > 26 && random > 3){
        respuesta = 'quiero';
        localStorage.setItem('deQuienEsElQuieroPrimero', 'PC');
        
      //miente: si tiene menos de 26, 30%
      }else if(tantoPC<26 && random >7){
        respuesta = 'quiero';
        localStorage.setItem('deQuienEsElQuieroPrimero', 'PC');

      // sino, no quiere
      }else{
        respuesta = 'no quiero';

      }
      
      return respuesta;

    case 'falta envido':

      if(tantoPC > 31 && random >2){
        respuesta = 'quiero';
        localStorage.setItem('deQuienEsElQuieroPrimero', 'PC');
      
      // si tiene entre 31 y 28, 60%
      }else if(tantoPC < 31 && tantoPC > 27 && random > 4){
        respuesta = 'quiero';
        localStorage.setItem('deQuienEsElQuieroPrimero', 'PC');
      
      // con menos de 27, 20%, miente
      }else if(tantoPC < 27 && random > 8){
        respuesta = 'quiero';
        localStorage.setItem('deQuienEsElQuieroPrimero', 'PC');
        
      // sino, no quiere
      }else{
        respuesta = 'no quiero';
      }

      return respuesta;

    case 'truco': 

      if (random > 1){

        // si tiene mas de un 2, 60%
        if (random > 4 && cartaMayorManoPC.valor > 9){

          respuesta = 'retruco';
          localStorage.setItem('deQuienEsElQuieroSegundo', 'jugador');
        
        // si tiene mas de un 12, %40
        }else if(cartaMayorManoPC.valor > 7 && random > 6){

          respuesta = 'quiero';
          localStorage.setItem('deQuienEsElQuieroSegundo', 'PC');
        
        // miente, %10
        }else if(random >9){

          respuesta = 'quiero';
          localStorage.setItem('deQuienEsElQuieroSegundo', 'PC');

        }else{

          respuesta = 'no quiero';
        
        }

      }

      break;
    
    case 'retruco':

      // si tiene un 3 o mas, 90% 
      if(cartaMayorManoPC.valor > 11 && random > 1){
        respuesta = 'quiero';
        localStorage.setItem('deQuienEsElQuieroSegundo', 'PC');

      // si tiene mas de un 2, 80%
      }else if(cartaMayorManoPC.valor > 9 && random > 2){
        respuesta = 'quiero';
        localStorage.setItem('deQuienEsElQuieroSegundo', 'PC');

      // si tiene un 12 o mas, %40
      }else if(cartaMayorManoPC.valor > 7 && random > 6){
        respuesta = 'quiero';
        localStorage.setItem('deQuienEsElQuieroSegundo', 'PC');

      }else{
        respuesta = 'no quiero'; 

      }

      break;
    
    case 'vale 4':

      if (random > 2){

        respuesta = 'quiero';
        localStorage.setItem('deQuienEsElQuieroSegundo', 'PC');

        break;
      
      }else{
      
        respuesta = 'no quiero';

      }

      break;
  }

  return respuesta;

}