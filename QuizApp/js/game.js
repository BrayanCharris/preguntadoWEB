$(function(){
    $.ajax({
        url: 'admin/validarAccesoQuiz.php',
        type: 'POST',
        success : function(resp){
            if (!resp) {
                window.location.href= "home.html";
            }
        }
    })

    $.ajax({
        url: 'admin/consultar_info_cuestionario.php',
        type: 'POST',
        success : function(resp){
            try {
            } catch (error) {
                console.log(resp);
            }
        }
    })
})



const navbar= document.querySelector('.navbar');
const timeCount = navbar.querySelector(".time");
const containerQuiz = document.querySelector(".content_container");
const option_list= document.querySelector(".optionsList");
const next_btn = document.querySelector(".btnNext");
const help_btn= document.querySelector(".btnayuda");

//Variables

let que_count=0;//Numero de pregunta
let que_numb=1;//Numero de pregunta que va
let counter;//Intervalo de tiempo
let timeValue=21;//Tiempo de contador
let ayudasUsadas=0;//ayudas usadas

//Consultar numero de preguntas y pregunta actual
consultarNpreguntas(function(resp) {
    navbar.querySelector('.pregunt .totalPreg').innerHTML = resp;
});

showQuestions(que_count);
startTimer(timeValue);

//Aciones de los Botones
next_btn.style.display="none";
next_btn.onclick=()=>{
    let total = navbar.querySelector('.pregunt .totalPreg').innerHTML;
    que_count++;
    que_numb++;
    if (que_count < total) {
        showQuestions(que_count);
        clearInterval(counter);
        startTimer(timeValue);
        next_btn.style.display="none";
        validateHelp();
    }else{
        window.location.href = "mostrarInfo.php";
    }
}

help_btn.onclick=()=>{
    /* ayudasUsadas */
}





//Funciones

function showQuestions(index){
    navbar.querySelector('.pregunt .numbPregunta').innerHTML = que_numb;

    const que_text= containerQuiz.querySelector(".questContainer .pregunta");

    $(function() {
        $.ajax({
            url: 'admin/consultar_pregunta.php',
            type : 'POST',
            data: {posicion: index},
            success : function(resp){
                let pregunta = JSON.parse(resp);

                navbar.querySelector('.categoryInfo').innerHTML = pregunta.nombreCate;

                let que_tag= pregunta.pregunta;

                let opcionesPregunta = pregunta.opciones;
                let option_tag="";
                var answer=1;
                opcionesPregunta.forEach(opcion => {
                    option_tag+='<button class="answer" style="background-color: var(--answer'+answer+');"  onclick="optionSelected(this)">'+opcion+'</button>';
                    answer++;
                });
                que_text.innerHTML=que_tag;
                option_list.innerHTML=option_tag;
                
            }
        })    
    })
}

function optionSelected(answer){
    clearInterval(counter);

    let userAns= answer.textContent;
    let allOptions = option_list.children.length;
    $(function() {
        $.ajax({
            url: 'admin/consultar_pregunta.php',
            type : 'POST',
            data: {posicion: que_count},
            success : function(resp){
                let pregunta = JSON.parse(resp);
                let correctAns= pregunta.respCorrecta;
                help_btn.style.display="none";
                for (let i = 0; i < allOptions; i++) {
                    option_list.children[i].style.background = "#5e5e5e";
                    option_list.children[i].setAttribute("disabled",true);
                }
                if (correctAns == userAns) {
                    answer.style.background = "#62c370";
                    $(function() {
                        $.ajax({
                            url: 'admin/cargarResultados.php',
                            type : 'POST',
                            data: {codigo: pregunta.codCate},
                            success : function(response){}
                        })    
                    })
                }else{
                    answer.style.background = "#ef3c69";
                }
                next_btn.style.display="block";
            }
        })
    })
}

//Contador
function startTimer(time){
    counter = setInterval(timer,1000);
    function timer(){
        time--;
        if(time< 10){
            timeCount.innerHTML="00:0"  + time;   
        }else{
            timeCount.innerHTML="00:"  + time;   
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.innerHTML = "00:00";
            tiempoAgotado();
            
            let allOptions = option_list.children.length;
            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].setAttribute("disabled",true);
            }
            /* next_btn.style.display="block";
            help_btn.style.display="none";
            messageAlert.style.display="block"; */
        }
    }
}
function validateHelp(){
    consultarNpreguntas(function(resp) {
        let ayudasTotal= Math.round(resp*0.4);
        $.ajax({
            url: 'admin/consultar_pregunta.php',
            type : 'POST',
            data: {posicion: que_count},
            success : function(resp){
                let pregunta = JSON.parse(resp);
                let nrespuestas=pregunta.opciones.length;
                if ((nrespuestas>2) && (ayudasUsadas<ayudasTotal)) {
                    help_btn.style.display="block";
                }else{
                    help_btn.style.display="none";
                }
            }
        })
    });
}

//Calcular el numero de preguntas a responder
function consultarNpreguntas(callback) {
    $.ajax({
        url: 'admin/consultarnpreguntas2.php',
        type: 'POST',
        success : function(n){
            callback(n);
        }
    })
}


function cargarGif() {
    let number= Math.floor(Math.random()*11);
    number++;
    document.getElementById('imagen').src="assets/gif/"+number+".gif";
}

function tiempoAgotado(){
    cargarGif();
    window.location.href="#modal";
}
function miniJuego(){
    window.location.href="#modal2";
}

function ocultarTodo() {
    window.location.href="#";
}