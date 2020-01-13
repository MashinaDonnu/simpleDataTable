<?php
require_once 'function.php';

$frontReq = $_POST['request'];

switch($frontReq){
    case 'getAllData':
        getAllData();
        break;
    case 'addGoods':
        addGoods();
         break;
    case 'createGoods':
        createGoods();
         break;
    case 'deleteGoods':
        deleteGoods();
    break;
        
}



