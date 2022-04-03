<?php    

    function desornedarRespuestas($arreglo){
        $arr=$arreglo;
        shuffle($arr);
        return $arr;
    }

    function consultarPreguntas($idCategoria,$limite)
    {
        global $connection;

        $cat=$idCategoria;
        $limit=$limite;
    
        $query="SELECT nombre_categoria,pregunta,resp_correcta,resp_incorrecta1,resp_incorrecta2,resp_incorrecta3 FROM categorias AS c INNER JOIN preguntas as p ON p.codigo_categoria=c.codigo_categoria INNER JOIN respuestas AS r ON R.codigo_pregunta=P.codigo_pregunta WHERE c.codigo_categoria=$cat ORDER BY rand() ";

        $numeroPreguntas=0;
        if ($limit != null) {
            $query = $query .  "LIMIT $limit;";
            $numeroPreguntas=$limit;
        }else{
            $numeroPreguntas=1;
        }
    
        $result= mysqli_query($connection,$query);
    
        if (!$result) {
            die('FAILD QUERY!'.mysqli_error($connection));
        }

        $registros=array();
    
        while ($fila = mysqli_fetch_array($result)) {
            $registros[]=array(
                "codCate" => $cat,
                "nombreCate" => $fila['nombre_categoria'],                
                "pregunta" => trim($fila['pregunta']),
                "respCorrecta" => $fila['resp_correcta'],
                "opciones" => desornedarRespuestas(array($fila['resp_correcta'],$fila['resp_incorrecta1'],$fila['resp_incorrecta2'],$fila['resp_incorrecta3']))
            );
        }

        $nElementos=count($registros);
        for ($i=0; $i < $nElementos; $i++) {
            $_SESSION['preguntas'][]=$registros[$i];
        }

        $_SESSION['NumeropregCategoria'][$cat]=$numeroPreguntas;
        $_SESSION['resultadoCategoria'][$cat]=0;

        
    }


?>