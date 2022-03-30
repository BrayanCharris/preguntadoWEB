<?php
    session_start();

    $json = array(
        'idAprendiz'=>$_SESSION['idAprendiz'],
        'nombreAprendiz'=>$_SESSION['nombreUsuario'],
        'idGrupo'=>$_SESSION['idGrupo']
    );

    $jsonString= json_encode($json);

    echo $jsonString;

?>