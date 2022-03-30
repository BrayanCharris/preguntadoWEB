var mostrarTodo= true;

function seleccionarQuizz(element) {
    var elemento=document.getElementById(element);
    var codigo = elemento.getAttribute('data-id');
    consultarSessiones(function(resp){
        let json = JSON.parse(resp);
        let idGrupoAprediz = json.idGrupo;
        if (codigo==idGrupoAprediz) {
            calNumeroAyudas(codigo);
            window.location.href="#modal";
        }else{
            alert('Usted no se encuentra habilitado para esta prueba');
        }
    })
}

function seleccionarOne() {
    if (mostrarTodo) {
        $.ajax({
            url: 'admin/consultar_cuestionario.php',
            type: 'POST',
            success : function(resp){
                mostrarQuiz(resp);
                $('#consultGrupo').html('Mostrar todos los cuestionarios');
            }
        })
        mostrarTodo=false;
    }else{
        consultarTodo(function(resp){
            mostrarQuiz(resp);
            $('#consultGrupo').html('Haz click aqui y encuentra tu cuestionario');
        });
        mostrarTodo=true;
    }
    console.log(mostrarTodo);
}

function consultarSessiones(callback) {
    $(function(){
        $.ajax({
            url: 'admin/consultar_sessions.php',
            type: 'POST',
            success : function(resp){
                callback(resp)
            }
        })
    })
}

function consultarTodo(callback) {
    $.ajax({
        url: 'admin/consultar_cuestionarios.php',
        type: 'POST',
        success : function(resp){
            callback(resp);
        }
    })
}

function mostrarQuiz(resp){ 
    let json = JSON.parse(resp);
    let template='';
    json.forEach(element => {
        template+='<a id="'+element.nombre+'" data-id="'+element.id+'" class="gameLink link" onclick="'+retornarOnclick(element.nombre)+'"><img src="assets/Fondos/bg1_2.jpg" alt=""><div class="gameDesc">Quiz de '+element.nombre+'</div></a>'
    });
    $('#categoryCont').html(template);
}

function calNumeroAyudas(codigo) {
    $.ajax({
        url: 'admin/consultarnpreguntas.php',
        type: 'POST',
        data: {codigo},
        success : function(n){
            let nayudas= Math.round(n*0.4);
            $('#nayudas').html(nayudas+' Ayudas');
        }
    })
}

function retornarOnclick(valor) {
    return "seleccionarQuizz('"+valor+"')";
}

$( "#comenzarQuiz" ).on( "click", function() {
    window.location.href="game.html";
});

$(function(){
    $.ajax({
        url: 'admin/validarAccesoQuiz.php',
        type: 'POST',
        success : function(resp){
            if (!resp) {
                window.location.href= "../login.html";
            }else{
                consultarSessiones(function(resp){
                    let json = JSON.parse(resp);
                    $('#nombreAprendiz').html(json.nombreAprendiz);
                });
                $(function(){
                    consultarTodo(function(resp){
                        mostrarQuiz(resp);
                    });
                })
            }          

        }
    })
})





