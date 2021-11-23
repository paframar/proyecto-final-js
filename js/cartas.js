// funcion randomEntre
randomEntre = (min, max) => Math.random() * (max - min) + min;

// clase Naipe: 
class Naipe{

  // .numero = numero de la carta
  // .palo="palo de la carta"
  // .valor = number, cuanto mayor mas fuerte

  // recibe el numero de la carta y el numero del palo 
  constructor(numeroParam, paloParam){

    // establece el numero de la carta
    this.numero=numeroParam;

    // establece el palo de la carta
    switch (paloParam){
      case 0:
        this.palo="espada";
        break;
      case 1:
        this.palo="basto";
        break;
      case 2:
        this.palo="oro";
        break;
      case 3:
        this.palo="copa";
        break;
      case -1:
        this.palo = "ninguno"
        break;
    }

    // establece el valor de la carta
    switch(numeroParam){

      case 1:
        if (this.palo == "espada"){
          this.valor = 14;
        } else if (this.palo == "basto"){
          this.valor = 13;
        } else {
          this.valor = 8;
        }
        break;

      case 7:
        if(this.palo == "espada"){
          this.valor = 12;
        }else if(this.palo == "oro"){
          this.valor = 11;
        }else{
          this.valor = 4;
        }
        break;

      case 3:
        this.valor = 10;
        break;
      case 2:
        this.valor = 9;
        break;
      case 12:
        this.valor = 7;
        break;
      case 11:
        this.valor = 6;
        break;
      case 10:
        this.valor = 5;
        break;
      case 6:
        this.valor = 3;
        break;
      case 5:
        this.valor = 2;
        break;
      case 4:
        this.valor = 1;
        break;
      default:
        this.valor = 0;
        break;
    }

    this.path = `/cards/${this.numero}${this.palo}.jpg`

  }

}


// quita todos los src de las cartas de la mesas
function limpiarMesas(){
  
  for ( let x = 1 ; x <= 3 ; x++ ){
    
    let cartaJugador = document.getElementById(`carta-mesa-jugador-${x}`);
    cartaJugador.src = "/cards/transparent.png";
    
    let cartaPC = document.getElementById(`carta-mesa-pc-${x}`);
    cartaPC.src = "/cards/transparent.png";
    
  }

  let mesaJugador = []; let mesaPC = [];

  localStorage.setItem('cartasMesaJugador', JSON.stringify(mesaJugador));
  localStorage.setItem('cartasMesaPC', JSON.stringify(mesaPC));

  
}

// quita todos los src de las cartas de las manos
function limpiarManos(){
  
  for ( let x = 1 ; x <= 3 ; x++ ){
    
    let cartaJugador = document.getElementById(`carta-jugador-${x}`);
    cartaJugador.src = "/cards/transparent.png";
    
    let cartaPC = document.getElementById(`carta-pc-${x}`);
    cartaPC.src = "/cards/transparent.png";
    
  }

  let manoJugador = []; let manoPC = [];

  localStorage.setItem('cartasManoJugador', JSON.stringify(manoJugador));
  localStorage.setItem('cartasManoPC', JSON.stringify(manoPC));
  
}

function mostrarMesa(deQuienParam){
  
  // mostrar MESA de JUGADOR
  if (deQuienParam == 'jugador'){
    
    let lengthMesa = JSON.parse(localStorage.getItem('cartasMesaJugador')).length;

    if (lengthMesa > 0){

      for (let x = 1 ; x <= lengthMesa ; x++){
        
        let cartasMesaJugador = JSON.parse(localStorage.getItem('cartasMesaJugador'));
        
        let imgCard = document.getElementById(`carta-mesa-jugador-${x}`);
        
        imgCard.src = cartasMesaJugador[x-1].path;
        
      }
      
    }

  }else if(deQuienParam == 'PC'){
    
    let lengthMesa = JSON.parse(localStorage.getItem('cartasMesaPC')).length;
    
    if (lengthMesa > 0){

      for (let x = 1 ; x <= lengthMesa ; x++){
        
        let cartasMesaPC = JSON.parse(localStorage.getItem('cartasMesaPC'));
        
        let imgCard = document.getElementById(`carta-mesa-pc-${x}`);

        imgCard.src = cartasMesaPC[x-1].path;

      }
      
    }
  }
  
}

function mostrarMano(deQuienParam){

  // mostrar MESA de JUGADOR
  if (deQuienParam == 'jugador'){

    let lengthMano = JSON.parse(localStorage.getItem('cartasManoJugador')).length;
   
    for(let x = 0; x < lengthMano; x++){

      // toma el array cartasManoJugador
      let cartasManoJugador = JSON.parse(localStorage.getItem('cartasManoJugador'));
      
      // construye el id del IMG utilizando el indice del for
      let idIMG = `carta-jugador-${x+1}`;
      // toma cada tag IMG
      let imgCartaJugador = document.getElementById(idIMG);

      // muestra la imagen tomando el path del objeto
      imgCartaJugador.src = cartasManoJugador[x].path;

    }
  

  }else if(deQuienParam == 'PC'){

    // limpia todos los dorsos
    for (let z = 1 ; z <= 3 ; z++){

      let idCardMano = `carta-pc-${z}`;
      
      let cardMano = document.getElementById(idCardMano);
      
      cardMano.src = "/cards/transparent.png";

    }

    // agrega tantos dorsos como largo del array mano

    let lengthMano = JSON.parse(localStorage.getItem('cartasManoPC')).length;

    for(let x = 1; x <= lengthMano; x++){
      
      let idCardMano = `carta-pc-${x}`;
      
      let cardMano = document.getElementById(idCardMano);
      
      cardMano.src = '/cards/dorso.jpg';
      
    }

  }

}

// reparte las cartas 
function repartirCartas(){
  
  //inicializacion vectores de objetos Naipe
  let mazo = [];
  let manoPC = [];
  let manoJugador = [];
  
  inicializarMazo(mazo);

  // repartirCartas()
  for (i=0; i<3; i++){

    // PC :

    // indice random aleatorio
    let random1 = randomEntre(0, mazo.length-1);
    
    // quito del mazo esa carta y la guardo en una variable
    let CartaRobada1 = mazo.splice(random1, 1);

    // agrego esa carta a la mano del PC
    // especifico [0] ya que .splice devuelve un array
    manoPC.push(CartaRobada1[0]);


    // JUGADOR:
    
    // indice random aleatorio
    let random2 = randomEntre(0, mazo.length-1);
    
    // quito del mazo esa carta y la guardo en una variable
    let CartaRobada2 = mazo.splice(random2, 1);

    // agrego esa carta a la mano del jugador2
    // especifico [0] ya que .splice devuelve un array
    manoJugador.push(CartaRobada2[0]);
    
  }

  // guarda en el storage el mazo y las manos:
  localStorage.setItem('cartasManoJugador', JSON.stringify(manoJugador));
  localStorage.setItem('cartasManoPC', JSON.stringify(manoPC));

}

// agrega las 40 cartas al mazo (btn-repartir-cartas)
function inicializarMazo(mazoParam){

  // agrega todas las cartas al mazo

  // palos del 0 al 3
  for (let i = 0; i<=3;i++){
    
    // numeros del 1 al 12
    for(let j = 1; j<=12;j++){

      // excepto 8s y 9s
      if (j!=8 && j!=9){
        
        // instancia la nueva carta
        let NuevaCarta = new Naipe(j, i);

        // agrega la nueva carta al mazo
        mazoParam.push(NuevaCarta);

      }
      
    }

  }

}


function calcularTantos(){
  
// - - - - - - - CALCULO DEL TANTO DE JUGADOR - - - - - - - -
  let tieneTanto = false;

  let tantoJugador = 0;
  let manoJugador = JSON.parse(localStorage.getItem('cartasManoJugador'));


  for (let x = 0; x <= 1; x++){

    for( let y = (x+1); y <= 2; y++){

      if (manoJugador[x].palo == manoJugador[y].palo){

        tieneTanto=true; 
        
        let tanto= 20;
        
        if (manoJugador[x].numero < 10){
          tanto = tanto + manoJugador[x].numero;
        }

        if (manoJugador[y].numero < 10){
          tanto = tanto + manoJugador[y].numero;
        }

        if (tanto > tantoJugador){
          tantoJugador = tanto;
        }
      }
    }
  }

  if (tieneTanto == false){

    for (let i = 0 ; i <= 2 ; i++){
      
      if (manoJugador[i].numero < 10){

        if(manoJugador[i].numero > tantoJugador){

          tantoJugador = manoJugador[i].numero;

        }

      }

    }

  }


// - - - - - - - CALCULO DEL TANTO DE PC - - - - - - - -
  tieneTanto = false;

  let tantoPC = 0;

  let manoPC = JSON.parse(localStorage.getItem('cartasManoPC'));


  for (let x = 0; x <= 1; x++){

    for( let y = (x+1); y <= 2; y++){

      if (manoPC[x].palo == manoPC[y].palo){

        tieneTanto=true; 
        
        let tanto= 20;
        
        if (manoPC[x].numero < 10){
          tanto = tanto + manoPC[x].numero;
        }

        if (manoPC[y].numero < 10){
          tanto = tanto + manoPC[y].numero;
        }

        if (tanto > tantoPC){
          tantoPC = tanto;
        }
      }
    }
  }

  if (tieneTanto == false){

    for (let i = 0 ; i <= 2 ; i++){
      
      if (manoPC[i].numero < 10){

        if(manoPC[i].numero > tantoPC){

          tantoPC = manoPC[i].numero;

        }

      }

    }

  }




  localStorage.setItem('tantoJugador', JSON.stringify(tantoJugador));
  localStorage.setItem('tantoPC', JSON.stringify(tantoPC));

 

}
    
   
function disableCard(){

  let lengthMano = JSON.parse(localStorage.getItem('cartasManoJugador')).length;
  let cartaJugador = document.getElementById(`carta-jugador-${lengthMano+1}`);
  cartaJugador.src = "/cards/transparent.png";
  cartaJugador.disable = true;
  cartaJugador.classList.remove('section-img-card-mano-jugador');


}

function enableManoJugador(){

  let lengthMano = JSON.parse(localStorage.getItem('cartasManoJugador')).length;
  
  for (x = 1 ; x <= lengthMano ; x++){

    let cartaJugador = document.getElementById(`carta-jugador-${x}`);
    
    cartaJugador.disable = false;

    cartaJugador.classList.add('section-img-card-mano-jugador');

  }
  
  let divBlock = document.getElementById('div-block');
  
  divBlock.classList.add('div-block-off');
  divBlock.classList.remove('div-block');

}

function disableManoJugador(tipoBlockParam){

  let lengthMano = JSON.parse(localStorage.getItem('cartasManoJugador')).length;
  
  for (x = 1 ; x <=lengthMano ; x++){

    let cartaJugador = document.getElementById(`carta-jugador-${x}`);
    
    cartaJugador.disable = true;
    
    cartaJugador.classList.remove('section-img-card-mano-jugador');

  }

  let divBlock = document.getElementById('div-block');

  switch (tipoBlockParam){
    case 'juega pc':
      divBlock.innerHTML = '';
      divBlock.innerHTML = '<p>TURNO DE LA PC</p><p>Presiona un CANTO o JUGAR PC para continuar.</p>';
      break;
    case 'repartir cartas':
      divBlock.innerHTML = '';
      divBlock.innerHTML = '<p><b>NUEVO JUEGO</b></p><p>Presiona REPARTIR CARTAS para comenzar.</p>';
      break;
    case 'fin de ronda':
      divBlock.innerHTML = '';
      divBlock.innerHTML = '<p><b>FIN DE RONDA</b></p><p>Presiona REPARTIR CARTAS para comenzar.</p>';
      break;
  }



  divBlock.classList.remove('div-block-off');
  divBlock.classList.add('div-block');

  
}









