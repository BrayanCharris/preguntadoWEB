<?php

    include('conexionBD.php');

    session_start();

    $cuestionario=array();
    
    $query="SELECT nombre_grupo FROM grupos WHERE id_grupo=".$_SESSION['idGrupo'];

    $resultado= mysqli_query($connection,$query);

    if (!$resultado) {
        die('ERROR AL CONSULTAR NOMBRE DE GRUPO'.mysqli_error($connection));
    }    

    while ($resul = mysqli_fetch_array($resultado)) {
        $cuestionario[]=array(
            'id'=> $_SESSION['idGrupo'],
            'nombre'=> $resul['nombre_grupo']
        );
    }
    
    $jsonString= json_encode($cuestionario);

    echo $jsonString;

?>