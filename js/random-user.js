function generarNombrePC(){
  
  let nombrePC;

  $.ajax({
    url: 'https://randomuser.me/api/?nat=us,es,fr,ir,ch,br,nz,nl',
    dataType: 'json',
    success: function(data) {
      nombrePC = `${data.results[0].name.first} ${data.results[0].name.last}`
      writeLog(`Estas jugando contra ${nombrePC}.`);
      localStorage.setItem('nombrePC', nombrePC);
      mostrarNombrePC();
    }
  });


}

function mostrarNombrePC(){

  let nombrePC = localStorage.getItem('nombrePC');

  $('#h2-nombre-pc').html(nombrePC);

}