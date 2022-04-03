const ROCK="piedra";
const PAPER="papel";
const SCISSORS="tijeras";

const TIE=0;
const WIN=1;
const LOST=2;

let playing=true;

const rockBtn= document.getElementById("rock");
const paperBtn= document.getElementById("paper");
const scissorsBtn= document.getElementById("scissors");
const resultText= document.getElementById("start-text");
const userImg= document.getElementById("user-img");
const machineImg= document.getElementById("machine-img");
const continueQuiz= document.getElementById("continueQue");


rockBtn.addEventListener("click",()=>{
    play(ROCK);
});

paperBtn.addEventListener("click",()=>{
    play(PAPER);
});

scissorsBtn.addEventListener("click",()=>{
    play(SCISSORS);
});

continueQuiz.addEventListener("click",()=>{
    reiniciarGamesRPS();
    /*  salirGameRPS();
     */
    ocultarTodo();
});

//Funciones
function play(userOption){
    if (!playing) {
        reiniciarGamesRPS();
        /* salirGameRPS();
         */
        ocultarTodo()
        return null;
    }

    userImg.src="assets/Icons/"+userOption+".png";
    resultText.innerHTML="Escogiendo⌛....."

    const interval = setInterval(function(){
        const machineOption = calcMachineOption();
        machineImg.src = "assets/Icons/" + machineOption + ".png";
    }, 200);


    setTimeout(function() {

        clearInterval(interval);

        const machineOption=calcMachineOption();

        const result= calcResult(userOption,machineOption);
    
        machineImg.src="assets/Icons/"+machineOption+".png";
    
        switch (result) {
            case TIE:
                resultText.innerHTML="TENEMOS UN EMPATE 😐";
                break;
            case WIN:
                resultText.innerHTML="ASOMBROSO,HAS GANADO 🎉";
                break;
            case LOST:
                resultText.innerHTML="PERDISTE,SUERTE PARA LA PROXIMA😔";
                break;
        }
        
    },2000);
    
    playing=false;
}

function calcMachineOption() {
    const number= Math.floor(Math.random()*3);

    switch (number) {
        case 0:
            return ROCK;
        case 1:
            return PAPER;
        case 2:
            return SCISSORS;
    }
}

function calcResult(userOption,machineOption) {

    if (userOption === machineOption) {
        return TIE;
    }else if(userOption === ROCK){

        if (machineOption === PAPER) return LOST;
        if(machineOption === SCISSORS) return WIN;

    }else if(userOption === PAPER){

        if (machineOption === SCISSORS) return LOST;
        if(machineOption === ROCK) return WIN;

    }else if(userOption === SCISSORS){

        if (machineOption === ROCK) return LOST;
        if(machineOption === PAPER) return WIN;

    }
}

//Funciones al finalizar juego
function salirGameRPS() {
    navbar.style.display='block';
    document.querySelector('.ayudasUsadas').innerHTML = ayudasUsadas;
    helpGame.classList.remove("activeMiniGame");
    quiz_box.classList.add("activeQuiz");
    startTimer(timeValue);
    startTimerLine(widthValue);
    showQuestions(que_count);
}


function reiniciarGamesRPS() {
    userImg.src="assets/Icons/"+ROCK+".png";
    machineImg.src="assets/Icons/"+ROCK+".png";
    resultText.innerHTML="Elige una opcion para Comenzar";
    playing=true;
}
