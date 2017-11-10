var droppedFiles = false;
var fileName = '';
var $dropzone = $('.dropzone');
var $button = $('.upload-btn');
var uploading = false;
var $syncing = $('.syncing');
var $done = $('.done');
var $bar = $('.bar');
var timeOut;

$dropzone.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
    e.preventDefault();
    e.stopPropagation();
})
    .on('dragover dragenter', function() {
        /*	$("#mouse1").hide();*/
        $dropzone.addClass('is-dragover');
    })
    .on('dragleave dragend drop', function() {
        $dropzone.removeClass('is-dragover');
    })
    .on('drop', function(e) {
        droppedFiles = e.originalEvent.dataTransfer.files;//拖拽的文件被保存在了droppedFiles中
        fileName = droppedFiles[0]['name'];//将文件名保存在fileName中。
        file = droppedFiles[0];

        $('.filename').html(fileName);
        $('.dropzone .upload').hide();
        $("#mouse").show();
    });

$button.bind('click', function() {
    startUpload();
});
//添加ajax请求



//添加进度条
/*xhr.upload.addEventListener("progress", function(e){
$("#dtb-msg3").hide();
$("#dtb-msg4 span").show();
$("#dtb-msg4").children('span').eq(1).css({width:'0px'});
$('.show').html('');
if(e.lengthComputable){
var loaded = Math.ceil((e.loaded / e.total) * 100);
$("#dtb-msg4").children('span').eq(1).css({width:(loaded*2)+'px'});
}
}, false);*/



//创建FormData,利用它可以通过js用一些键值对来模拟一系列表单控件。
//使用send()方法来异步的提交这个表单。
//需要一个传统的form表单来初始化formdata.
//首先看一下formData的基本用法：FormData对象，可以把所有表单元素的name与value组成一个queryString，
//提交到后台。只需要把 form 表单作为参数传入 FormData 构造函数即可：




$("input:file").change(function (){
    fileName = $(this)[0].files[0].name;
    $('.filename').html(fileName);
    $('.dropzone .upload').hide();
});

function startUpload() {

    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    xhr.onreadystatechange=_callback(xhr);
    fd.append('myfile',droppedFiles);
    xhr.open('POST',"http://120.76.140.147/fileupload/uploadpri.php",true);
    xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");//设置请求头参数，进行异步请求
    xhr.send(fd);
    function _callback(){
        if(xhr.readyState == 4 && xhr.status == 200){
            alert('dd');
            alert(xhr.responseText);
        }}


    if (!uploading && fileName != '' ) {
        uploading = true;
        $button.html('Uploading...');
        $dropzone.fadeOut();
        $syncing.addClass('active');
        $("#header").addClass("uploading");
        $done.addClass('active');
        $bar.addClass('active');
        timeoutID = window.setTimeout(showDone, 3200);
    }
}

function showDone() {
    $button.html('Done');
}
