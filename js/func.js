
$(document).ready(function() {



$("#down").click(checkLength);

$("#downyes").click(deletefile);
$("#downno").click(function(){$("#delete").fadeOut();});
function deletefile(){alert("删除成功");$("#delete").fadeOut();}

     function checkLength(){

       var password=document.getElementById("token-input"); //获取密码框值

    if(password.value.length<6){
         alert("密码长度必须大于六位！");
         return false;
    }
$("#delete").fadeIn();
/*setTimeout(function(){  })*/

    }

var droppedFiles = false;
var fileName = '';
var $dropzone = $('.dropzone');
var $button = $('.upload-btn');
var uploading = false;
var $syncing = $('.syncing');
var $done = $('.done');
var $bar = $('.bar');
var timeOut;
var oMyForm;
$("input:file").change(function (){
      $("#head").removeClass("uploadedh");
    $("#head").removeClass("uploadingh");
    $("#hand").removeClass("uploading");
	fileName = $(this)[0].files[0].name;
	$('.filename').html("已选取文件:"+fileName);
	$('.dropzone .upload').hide();
  $("#alert2").fadeIn(1000);
			$("#butup").css('background-color','#2aa1fe');
$("#mouth").removeClass("fadein").addClass("close");
$(".content").removeClass("tip");
});
$dropzone.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
	e.preventDefault();
	e.stopPropagation();
})
	.on('dragover dragenter', function() {
	$("#mouth").removeClass("close").addClass('is-dragover-mouth');
	$("#mouth").removeClass("fadeout").addClass("fadein");
	$('.teeth').css('visibility','inherit');

})
	.on('dragleave dragend', function() {
$dropzone.removeClass('is-dragover');
	$("#mouth").removeClass('is-dragover-mouth');
	  $("#mouth").removeClass("fadein").addClass("fadeout");
$('.teeth').css('visibility','hidden');
})
	.on('drop', function(e) {
			$("#head").removeClass("uploadedh");
		$("#head").removeClass("uploadingh");
		$("#hand").removeClass("uploading");
		$("#butup").css('background-color','#2aa1fe');
$("#mouth").removeClass("fadein").addClass("close");
$(".content").removeClass("tip");
setTimeout(function(){
	$('.teeth').css('visibility','hidden');
},900);

	droppedFiles = e.originalEvent.dataTransfer.files;
	fileName = droppedFiles[0]['name'];
    $("#alert2").fadeIn(1000);
  $('.filename').html("已选取文件:"+fileName);
	$('.dropzone .upload').hide();
});


$("#butup").bind("click", function () {

if(droppedFiles==false&&fileName==""){
  $("#alert").fadeIn(1000,function(){$("#alert").fadeOut(3000);});
  return false;
}

$("#butup").html("上传中");
$(".filename").html("文件"+fileName+"正在上传中...");
                      $("#body").addClass("breath");
            $("#hand").addClass("uploading");
            $("#head").addClass("uploadingh");
oMyForm = new FormData();

oMyForm.append("myfile",droppedFiles[0])

if(droppedFiles==false){
	oMyForm = new FormData($("#form1")[0]);
}
setTimeout(function(){$.ajax({
      url: 'http://120.76.140.147/fileupload/uploadpri.php' ,
          type: 'POST',
          data: oMyForm,
          async: false,
          cache: false,
          dataType: 'json',
          contentType: false,
          processData: false,
          beforeSend:function(xhr){

        console.log(xhr)
        console.log('发送前')
    },
          success:function(data,textStatus,jqXHR){
          	$("#butup").html("上传完毕");
   $("#alert2").fadeOut(500);

          	setTimeout(function(){$("#body").removeClass("breath")},1000);
          	setTimeout(function(){$("#head").addClass("uploadedh")},1000);
          	setTimeout(function(){$("#mesbox").fadeIn();},2000);
setTimeout(function(){$("#butup").html("上传文件");},7000)
	$('#filename').html(fileName);
	$("#password").html(data.pass);
	$('.filename').html("");
	fileName = "";
	droppedFiles = false;
$("#butup").css('background-color','#bfbfbf');
$(".content").addClass("tip");
        console.log(data)



        console.log(textStatus)
        console.log(jqXHR)
    },
          error:function(xhr,textStatus){
        console.log('错误')
        console.log(xhr)
        console.log(textStatus)
    },
complete:function(){
        console.log('结束')

    }
      });},2000);

});

});