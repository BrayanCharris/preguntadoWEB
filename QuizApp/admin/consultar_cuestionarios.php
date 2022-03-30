<?php

    include('conexionBD.php');


    /* ------Consultar id de los grupos que estan habilitados para la prueba ------- */

    $query1="SELECT DISTINCT(id_grupo) FROM configuracion_juego_grupo ORDER BY fecha DESC";

    $resultado1= mysqli_query($connection,$query1);

    if (!$resultado1) {
        die('ERROR AL CONSULTAR ID DE PRUEBAS'.mysqli_error($connection));
    }


    $idGrupos=array();

    while ($resul1 = mysqli_fetch_array($resultado1)) {
        $idGrupos[]=$resul1['id_grupo'];
    }

    /* ------Consultar los nombres de los grupos con las id consultadas anteriorment ------- */

    $cuestionarios=array();
    foreach ($idGrupos as $value) {
        
        $query2="SELECT nombre_grupo FROM grupos WHERE id_grupo=$value";
    
        $resultado2= mysqli_query($connection,$query2);
    
        if (!$resultado2) {
            die('ERROR AL CONSULTAR NOMBRE DE GRUPOS'.mysqli_error($connection));
        }    
    
        while ($resul2 = mysqli_fetch_array($resultado2)) {
            $cuestionarios[]=array(
                'id'=> $value,
                'nombre'=>$resul2['nombre_grupo']
            );
        }
    }
    
    $jsonString= json_encode($cuestionarios);

    echo $jsonString;

?>