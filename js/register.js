
function cambiarEstiloCombo() {
    document.querySelector('.inputxt').style.color='#000';
}

$(function(){

    consutarGrupos();

    $('#formRegistro').submit(function(e){
        var grupo=$('#grupos').val(),
            ficha=$('#numeroFicha').val(),
            nombre=$('#nombre').val(),
            correo=$('#correo').val(),
            contra=$('#contra').val(),
            verif=$('#verificacion').val();
        
        if (grupo != 'select') {
            if (contra==verif) {
                consutarIdGrupo(grupo,function(resp){
                    let idGrupo=resp;
    
                    consultarExstenciaAprendiz(correo,function (resp){
                        try {
                            let json=resp;
    
                            if (json==true) {
                                alert('Lo sentimos ya existe un aprendiz con este correo!');
                            } else {
                                $.ajax({
                                    type: 'POST',
                                    url: 'admin/registrarAprendiz.php',
                                    data: {
                                        'nombre':nombre,
                                        'correo': correo,
                                        'contraseña':contra,
                                        'idgrupo':idGrupo,
                                        'numeroFicha':ficha
                                    },
                                    success: function(response){
                                        try {
                                            if (response==true) {                                                
                                                $('#alerta').html('REGISTRO COMPLETADO!');
                                                document.querySelector('#alerta').style.color="green";
                                                setTimeout(() => {
                                                    window.location.href="login.html";
                                                }, 1100);
                                            }
                                        } catch (error) {
                                            console.log(response);
                                        }
                                    }
                                });
                            }
                        } catch (error) {
                            console.log(resp);
                        }
                    })
    
                })
            }else{
                $('#alerta').html('Las contraseñas no coinciden!');
            }
        }else{
            $('#alerta').html('SELECCIONE SU GRUPO!');
        }
        e.preventDefault();
    });

    //Funciones

    function consutarGrupos() {
        $.ajax({
            url: 'admin/consultar_grupos.php',
            type: 'POST',
            success: function(response){
                try {
                    let grupos = JSON.parse(response);
    
                    let opciones='<option value="select">Grupo</option>';
                    grupos.forEach(grupo => {
    
                        opciones+=`
                            <option value="${grupo.nombre}">${grupo.nombre}</option>
                        `;
    
                    });
    
                    $('#grupos').html(opciones);
                } catch (error) {
                    console.log(response);
                }
                
            }
        });
    }

    function consutarIdGrupo(nombre,my_callback){
        $.ajax({
            url: 'admin/consultar_ID_grupo.php',
            type:'POST',
            data: {nombre},
            success: function(response) {
                try {
                    let id= JSON.parse(response)[0].id;
                    my_callback(id);
                } catch (error) {
                    console.log(response);
                }
            }
        })
    }

    function consultarExstenciaAprendiz(correo,my_callback) {
        $.ajax({
            type: 'POST',
            url: 'admin/consultar_existencia_aprendiz.php',
            data: {correo},
            success: function(response){
                try {
                    my_callback(response)
                } catch (error) {
                    console.log(response);
                }
            }  

        });
    }
});