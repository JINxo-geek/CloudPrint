<?php
header('Access-Control-Allow-Origin:*');
//header('Access-Control-Allow-Credentials:true');
//header('Access-Control-Allow-Methods:GET, POST, OPTIONS');
function CheckURL(){
    $servername=$_SERVER['SERVER_NAME'];
    $sub_from=$_SERVER["HTTP_REFERER"];
    $sub_len=strlen($servername);
    $checkfrom=substr($sub_from,7,$sub_len);
    if($checkfrom!=$servername)die("警告！你正在从外部提交数据！请立即终止！");

}
//CheckURL();
$con123 = var_export($_FILES,TRUE);
$content_log = $_FILES['myfile']["name"];
$content_log = $content_log.$con123;
$file_log = "log.txt";
file_put_contents($file_log, $content_log);
require_once './opt_base.php';
$uploaded1 = new curd();
$uploaded1->uploadServerFile($client);
