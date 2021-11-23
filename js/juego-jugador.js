function jugarCartaJugador(pathParam){

  // busca la mano y la mesa del jugador en el storage
  let manoJugador = JSON.parse(localStorage.getItem('cartasManoJugador'));
  let mesaJugador = JSON.parse(localStorage.getItem('cartasMesaJugador'));
  
  // MUESTRA LA FOTO DE LA CARTA y PUSHEA AL VECTOR MESA JUGADOR
  for ( x = 0 ; x < manoJugador.length ; x++ ){
    
    // determina cual es la posicion donde se encuentra
    // el .path del objeto (ruta relativa) dentro del
    // src de la IMG (ruta absoluta)
    let posIni = (pathParam.length - manoJugador[x].path.length);

    // extrae el nombre del archivo en el Path
    let nombreArchivoEnPath = pathParam.slice(posIni, pathParam.length);

    // evalua si es el path de la carta que esta recorriendo el for
    if (nombreArchivoEnPath == manoJugador[x].path){

      // de ser asi, quita con splice la cartaJugada
      let cartaJugada = manoJugador.splice(x,1);

      // pushea la carta al array mesaJugador
      mesaJugador.push(cartaJugada[0]);

    }

  }

  
  // guarda la mano y la mesa modificadas en el storage
  localStorage.setItem('cartasManoJugador', JSON.stringify(manoJugador));
  localStorage.setItem('cartasMesaJugador', JSON.stringify(mesaJugador));
  
  
}