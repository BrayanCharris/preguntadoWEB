<?php
    session_start();

    $acceder=false;

    if (isset($_SESSION['jugando'])) {   
        $acceder=$_SESSION['jugando'];
    }

    echo $acceder;
?>