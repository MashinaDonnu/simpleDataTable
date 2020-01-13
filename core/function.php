<?php
define('SERVERNAME','localhost');
define('USERNAME','mysql');
define('DBNAME','study');
define('PASSWORD','mysql');

function getAllData(){
    $conn = mysqli_connect(SERVERNAME,USERNAME,PASSWORD,DBNAME);
    $sql = "SELECT * FROM eshop";
    $result = mysqli_query($conn,$sql);
  
    
    $arr = array();
    while($row = mysqli_fetch_assoc($result)){
        // print_r($row);
        $arr[]=$row;
    }

    echo json_encode($arr);
}

function addGoods(){
    if(trim($_POST['goods'])!='' && trim($_POST['price'])!='' && trim($_POST['amount'])!='' && trim($_POST['country'])!='' && trim($_POST['article'])!='' && trim($_POST['time'])!=''){
        $goods = $_POST['goods'];
        $price = $_POST['price'];
        $amount = $_POST['amount'];
        $country = $_POST['country'];
        $article = $_POST['article'];
        $time = $_POST['time'];

        $conn = mysqli_connect(SERVERNAME,USERNAME,PASSWORD,DBNAME);
        $sql = 'INSERT INTO eshop (goods,price,amount,country,1c_articul,time_add) VALUES("'.$goods.'","'.$price.'","'.$amount.'","'.$country.'","'.$article.'","'.$time.'")';
        $result = mysqli_query($conn,$sql);
        if(!$result) echo 'failed insert';
        else echo 1;
    }
    else {
        echo 0;
    }
  
}


function createGoods(){
    if(trim($_POST['goods'])!='' && trim($_POST['price'])!='' && trim($_POST['amount'])!='' && trim($_POST['country'])!='' && trim($_POST['article'])!='' && trim($_POST['time'])!=''){
        $goods = $_POST['goods'];
        $price = $_POST['price'];
        $amount = $_POST['amount'];
        $country = $_POST['country'];
        $article = $_POST['article'];
        $time = $_POST['time'];
        $id = $_POST['id'];

        $conn = mysqli_connect(SERVERNAME,USERNAME,PASSWORD,DBNAME);
        $sql = 'UPDATE eshop SET goods = "'.$goods.'" , price = "'.$price.'",amount = "'.$amount.'",country = "'.$country.'",1c_articul = "'.$article.'",time_add = "'.$time.'" WHERE id ='.$id;
        $result = mysqli_query($conn,$sql);
        if(!$result) echo 'failed';
        else echo 1;
    }
    else {
        echo 0;
    }
    // echo $id;
  
}

function deleteGoods(){
    $id = $_POST['id'];
    $conn = mysqli_connect(SERVERNAME,USERNAME,PASSWORD,DBNAME);
    $sql = 'DELETE FROM eshop WHERE id ='.$id;
    $result = mysqli_query($conn,$sql);
    if(!$result) echo 0;
    else echo 1;
}