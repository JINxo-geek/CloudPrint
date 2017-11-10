<?php
header('Access-Control-Allow-Origin:*');
require_once './redis_59/config.php';

ini_set('display_errors','on');
error_reporting(E_ALL);
//echo exec('whoami');
class curd
{
    public function uploadServerFile($client = "")
    {
        if(is_uploaded_file($_FILES['myfile']['tmp_name'])) {
            //把文件转存到你希望的目录（不要使用copy函数）
            $uploaded_file = $_FILES['myfile']['tmp_name'];

            //我们给每个用户动态的创建一个文件夹
            $user_path = $_SERVER['DOCUMENT_ROOT'];
            //判断该用户文件夹是否已经有这个文件夹
            if(!file_exists($user_path)) {
                mkdir($user_path);
            }

            $move_to_file=$user_path."/".$_FILES['myfile']['name'];
            $file_true_name=$_FILES['myfile']['name'];
            $file_index = time().rand(1,1000).substr($file_true_name,strrpos($file_true_name,"."));
            //echo "asdfjklajsaklkfl;sf;akf;ldskflasjgksal".$file_index;
            $move_to_file=$user_path."/filebase/".$file_index;
            //echo "$uploaded_file   $move_to_file";
            if(move_uploaded_file($uploaded_file,$move_to_file)) {
                //echo $_FILES['myfile']['name']."上传成功";
                $pass = rand(100000,999999);
                //echo "密码为".$pass;
                $client->set($pass,$file_index);
                $client->set($file_index."name",$_FILES["myfile"]['name']);
		$client->expire($pass,43200);
		$client->expire($file_index,43200);
                $pass_respon = array('statu'=>'上传成功','pass'=>$pass,'filename'=>$_FILES['myfile']['name']);
                echo json_encode($pass_respon);
            } else {
                echo "上传失败";
            }
        } else {
            echo "上传失败1";

        }
    }

    public function getServerFile($client = "",$pass ="")
    {
        echo $pass;
        $file_index = $client->get($pass);
        $fileinfo = pathinfo('/filebase/'.$file_index);
	$filename = '/var/www/html/filebase/'.$file_index;
	header('Content-type: application/x-'.$fileinfo['extension']);
        header('Content-Disposition: attachment; filename='.$client->get($file_index.'name'));
        header('Content-Length: '.filesize($filename));
	readfile($filename);
        exit();
        //header('Location:http://120.76.140.147/fileupload/filebase/'.$file_index);
    }
}

$uploaded1 = new curd();
