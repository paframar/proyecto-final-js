// array utilizado con los Keys en el localstorage de cada status de cada boton, correlativo al de los ID de los botones
let arrayKeys = ['statusBtnNuevoJuego', 'statusBtnRepartirCartas', 'statusBtnJugarPC', 'statusBtnRetirarse', 
'statusBtnEnvido', 'statusBtnRealEnvido', 'statusBtnFaltaEnvido', 'statusBtnTruco', 'statusBtnRetruco', 'statusBtnVale4'];
// array con los ID de los botones, correlativo al de los keys del localstorage
let arrayButtons = ['btn-nuevo-juego', 'btn-repartir-cartas', 'btn-jugar-pc', 'btn-retirarse',
'btn-envido', 'btn-real-envido', 'btn-falta-envido', 'btn-truco', 'btn-retruco', 'btn-vale-4'];



// deshabilita un boton
function disableButton(buttonIDParam){

  button = document.getElementById(buttonIDParam);

  // escribe en el localstorage el status del boton
  for (let i = 0 ; i < arrayButtons.length ; i++ ){
    if (arrayButtons[i] == buttonIDParam){
      let key = arrayKeys[i];
      localStorage.setItem(key, 'off');
    }
  }

  if (!(button.classList.contains(`btn-disabled`))){
    button.disabled = "true";
    button.classList.add(`btn-disabled`);
  }

}

// habilita un boton
function enableButton(buttonIDParam){

  // escribe en el localstorage el status del boton
  for (let i = 0 ; i < arrayButtons.length ; i++ ){
    if (arrayButtons[i] == buttonIDParam){
      let key = arrayKeys[i];
      localStorage.setItem(key, 'on');
    }
  }

  let button = document.getElementById(buttonIDParam);

  if (button.classList.contains(`btn-disabled`)){
    button.disabled = "";
    button.classList.remove(`btn-disabled`);
  }

}


// recalea del localstorage el status de los botones
function recallBtnsStatus(){ 

  for (let i = 0 ; i < arrayKeys.length ; i ++ ){

    let statusBtn = localStorage.getItem(arrayKeys[i]);

    if (statusBtn == 'off'){

      disableButton(arrayButtons[i]);

    }else if (statusBtn == 'on'){

      enableButton(arrayButtons[i]);
    }

  }
}


function setBotonesNoMasEnvido(){
  disableButton('btn-envido');
  disableButton('btn-real-envido');
  disableButton('btn-falta-envido');
}

// setea los botones al clickear Repartir cartas
function setBotonesRepartirCartas(){

  disableButton(`btn-repartir-cartas`);
  enableButton(`btn-nuevo-juego`);
  enableButton(`btn-retirarse`);

  enableButton(`btn-envido`);
  enableButton(`btn-real-envido`);
  enableButton(`btn-falta-envido`);
  
  enableButton(`btn-truco`);
  disableButton(`btn-retruco`);
  disableButton(`btn-vale-4`);
}

// setea los botones al clickear Nuevo juego
function setBotonesNuevaRonda(){


  disableButton(`btn-retirarse`);
  enableButton(`btn-repartir-cartas`);
  
  disableButton(`btn-jugar-pc`);
    
  disableButton(`btn-envido`);
  disableButton(`btn-real-envido`);
  disableButton(`btn-falta-envido`);

  disableButton(`btn-truco`);
  disableButton(`btn-retruco`);
  disableButton(`btn-vale-4`);

}

// setea los botones al terminar la partida
function setBotonesFinPartida(){

  disableButton('btn-envido');
  disableButton('btn-real-envido');
  disableButton('btn-falta-envido');
  
  disableButton('btn-truco');
  disableButton('btn-retruco');
  disableButton('btn-vale-4');
  
  disableButton('btn-jugar-pc');
  disableButton('btn-repartir-cartas');
  disableButton('btn-retirarse');
  enableButton('btn-nuevo-juego');
  
}
  
// setea los botones al clickear Truco
function setBotonesTruco(){
  disableButton(`btn-envido`);
  disableButton(`btn-real-envido`);
  disableButton(`btn-falta-envido`);
  disableButton(`btn-truco`);

  let deQuienEsElQuieroSegundo = localStorage.getItem('deQuienEsElQuieroSegundo');

  if (deQuienEsElQuieroSegundo == 'PC'){
    disableButton(`btn-retruco`);
  }else if(deQuienEsElQuieroSegundo == 'jugador'){
    enableButton(`btn-retruco`);
  }

  disableButton(`btn-vale-4`);

}

// setea los botones al clickear Retruco
function setBotonesRetruco(){

  disableButton(`btn-truco`);
  disableButton(`btn-retruco`);

  let deQuienEsElQuieroSegundo = localStorage.getItem('deQuienEsElQuieroSegundo');

  if (deQuienEsElQuieroSegundo == 'PC'){
    disableButton(`btn-vale-4`);
  }else if(deQuienEsElQuieroSegundo == 'jugador'){
    enableButton(`btn-vale-4`);
  }

}

// setea los botones al clickear Vale 4
function setBotonesVale4(){
  disableButton(`btn-truco`);
  disableButton(`btn-vale-4`);
}


// setea los botones al clickear envido
function setBotonesEnvido(){
  disableButton('btn-envido');
  disableButton('btn-real-envido');
  disableButton('btn-falta-envido');  
}

// setea los botones al clickear Real envido
function setBotonesRealEnvido(){
  disableButton('btn-envido');
  disableButton('btn-real-envido');
  disableButton('btn-falta-envido');  
}

// setea los botones al clickear Falta envido
function setBotonesFaltaEnvido(){
  disableButton(`btn-envido`);
  disableButton(`btn-real-envido`);
  disableButton(`btn-falta-envido`);
}





