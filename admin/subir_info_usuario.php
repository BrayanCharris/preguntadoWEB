<?php
    $idaprendiz=$_POST['idAprendiz'];
    $nombre=$_POST['nombre'];
    $idGrupo=$_POST['IdGrupo'];

    session_start();

    $_SESSION['idAprendiz']=$idaprendiz;
    $_SESSION['nombreUsuario']=extraerNombreyApellido($nombre);
    $_SESSION['idGrupo']=$idGrupo;

    echo true;

    function extraerNombreyApellido($nombreUsuario){
        
        $nombres = explode(' ', $nombreUsuario);

        $nombreCorto="";
        switch (count($nombres)) {
            case 3:
                $nombreCorto="$nombres[0] $nombres[1]";
                break;
            case 4:
                $nombreCorto="$nombres[0] $nombres[2]";
                break;
            default:
                $nombreCorto=$nombreUsuario;
        }
        return $nombreCorto;
    }
?>