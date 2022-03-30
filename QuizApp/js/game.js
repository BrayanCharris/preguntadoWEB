function cargarGif() {
    let number= Math.floor(Math.random()*11);
    number++;
    document.getElementById('imagen').src="assets/gif/"+number+".gif";
}

function mostrar(){
    cargarGif();
    window.location.href="#modal";
}

function ocultar(params) {
    window.location.href="#";
}