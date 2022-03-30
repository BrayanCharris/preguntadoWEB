<?php

    include('conexionBD.php');
    
    $cod= $_POST['codigo'];

    $query="SELECT numero_preguntas FROM configuracion_juego_grupo WHERE id_grupo=$cod";

    $result = mysqli_query($connection,$query);

    if (!$result) {
        die('ERROR AL CONSULTAR EL NUMERO DE AYUDAS'.mysqli_error($connection));
    }

    $npreg=0;
    while ($row = mysqli_fetch_array($result)) {
        if ($row['numero_preguntas']==null) {
            $npreg++;
        }else{
            $npreg+=$row['numero_preguntas'];
        }
    }

    echo $npreg;


?>