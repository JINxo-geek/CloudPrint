<?php
header('Access-Control-Allow-Origin:*');
require_once './opt_base.php';
$pass = $_GET['pass'];
$getfile = new curd();
$getfile->getServerFile($client,$pass);


