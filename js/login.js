$(function(){
    $('#formIngreso').submit(function(e){

        var correo= $('#correo').val(),
            contra= $('#contraseña').val();
        
            $.ajax({
                url: 'admin/consultar_Aprendiz.php',
                type:'POST',
                data:{correo},
                success: function(response){
                  let json= JSON.parse(response);
                  if (json.length > 0) {
                      let aprendiz= json[0].id_aprendiz;
                      let nombreAprendiz= json[0].nombre;
                      let contraseñaConsulta= json[0].contra;
                      let IdGrupo= json[0].grupo;
      
                      if (contra === contraseñaConsulta) {
                        agregarValores(aprendiz,nombreAprendiz,IdGrupo);
                      }else{
                        $('#alerta').html('La contraseña es incorrecta');
                        document.querySelector('#alerta').style.color="#ca2c05";
                      }
                      
                  } else {
                    $('#alerta').html('No existe un usuario con este correo');
                    document.querySelector('#alerta').style.color="gray";
                  }
                }
            });

        e.preventDefault();  
    });

    //Funciones
    function agregarValores(idAprendiz,nombre,IdGrupo) {
        $.ajax({
            url: 'admin/subir_info_usuario.php',
            type:'POST',
            data: {idAprendiz,nombre,IdGrupo},
            success: function(response){
                window.location.href= "QuizApp/home.html";
            }
        })
    }
})