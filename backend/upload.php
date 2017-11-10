<html>
<head>
<meta http-equiv="content-type" content="text/html;charset=utf-8"/>
<title>上传你的File吧</title>
<script src="jquery-3.2.1.min.js">
</script>
</head>
<body/>
<form id="uploadform">
<table>
<tr><td align="center" colspan="2"><font style="font-size:40px;font-family: 华文彩云;">文件上传</font></td></tr>
<tr><td>请选择你要上传文件：</td><td><input type="file" name="myfile"/></td></tr>
<tr><td><input type="button" value="上传文件" onclick="doUpload()"/></td></tr>
</table>
</form>

<form enctype="multipart/form-data" method="get" action="getpri.php">
<table>
<tr><td align="center" colspan="2"><font style="font-size:40px;font-family: 华文彩云;">文件上传</font></td></tr>
<tr><td>请输入密码：</td><td><input type="text" name="pass"/></td></tr>
<tr><td><input type="submit" value="下载"/></td></tr>
</table>
</form>

</body>
<script>
function doUpload() {
     var formData = new FormData($("#uploadform")[0]);
     $.ajax({
          url: 'http://120.76.140.147/fileupload/uploadpri.php' ,
          type: 'POST',
          data: formData,
          async: false,
          cache: false,
          contentType: false,
          processData: false,
          success: function (returndata) {
              alert(returndata);
           },
          error: function (returndata) {
              alert(returndata);
           }
      });
 }
</script>
</html>
