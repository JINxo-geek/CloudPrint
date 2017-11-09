var animating = false,
	handheld = false;
var baseURL = $('#baseURL').val();
$(document).ready(function () {
	$("#uploading").hide(0);
	$('#uploading-ie').hide(0);
	$("#downloading").hide(0);
	bindEvents();
	deviceDetector();

	var date = new Date();
	/*
	if (false &&date.getMonth() + 1 === 12 && date.getDate() >= 25 && date.getDate() <= 28) {
		$("#drag-box #drag-logo").mouseenter(function () {
			$(this).css({"backgroundImage" : "url('../img/christmas-2016-hover.png')"});
		});
		$("#drag-box #drag-logo").mouseleave(function () {
			$(this).css({"backgroundImage" : "url('../img/christmas-2016.png')"});
		});
	}
	*/
});

$(window).resize(function () {
	deviceDetector();
});

var runTable = false;



function bindEvents() {
	$(".modal-close").bind("click", formDisappear);
	$(".modal-btn").bind("click", formAppear);
	$("#modal-container").bind("click", function (evt) {
		if (!handheld && evt.target.id === "modal-container") {
			formDisappear();
		}
	});
	$(".close").bind("click", function () {
		$(this).parent(".alert").fadeOut();
	});
	$('#secret-toDownload').bind('click', secretFormReturn);
	$('#select-all-on').bind('click', selectAllLineOn);
	$('#select-all-off').bind('click', selectAllLineOff);
	$('#upload-file-clean').bind('click', function(){
		uploadTableVector.splice(0, uploadTableVector.length);
		$('.upload-select-td').fadeOut(300, function(){
			uploadTableShow();
		});
	});

	if(typeof(isIE) == 'undefined'){
		$('#upload-file-input').bind('click', function(){
			indexOnclick = false;
			$('#input-file').click();
		});
	}
	else{
		$('#upload-file-input').bind('click', function(){
			$('#input-file-ie').click();
		});
	}
}

var uploadTableVector = [];
var indexOnclick = false;













var uploadTableLineNumber;
//可以让Modal重复点击
function uploadTableShow(evt){
	uploadTableLineNumber = Math.floor($('#upload-result-container').width() / 50);
	if(uploadTableLineNumber > 5) uploadTableLineNumber = 5;

	if(uploadTableVector.length == 0){
		$('#upload-result-container').html('');
		$('#upload-result-p').html('');
		return;
	}
	var str = '<tr>';
	var flag = 0;
	for(var i = 0; i < uploadTableVector.length; ++i){
		if(i >= (flag + uploadTableLineNumber)){
			str += '</tr><tr>';
			flag += uploadTableLineNumber;
		}
		str += ('<td class="upload-select-td" id="upload-select' + String(i) +  '-td">');
		str += buildUploadTableBlock(uploadTableVector[i], i);
		str += '</td>';
	}
	for(var i = uploadTableVector.length; i < 4 * uploadTableLineNumber; ++i){
		if(i >= (flag + uploadTableLineNumber)){
			str += '</tr><tr>';
			flag += uploadTableLineNumber;
		}
		str += '<td>';
		str += '</td>';
	}
	str += '</tr>';
	$('#upload-result-container').html(str);

	var filesize = 0;
	for(file in uploadTableVector){
		try{
			var size = parseInt(uploadTableVector[file]['size']);
		}
		catch(err){
			continue;
		}
		filesize += size;
	}

	try{
		if(filesize > parseInt($('#max_file_size').attr('value'))){
			$('#upload-result-p').css({color: '#c7254e'});
			$('#upload-result-p').html('已选择' +
			String(uploadTableVector.length) + '个文件，总大小' +
			String((filesize / 1024 / 1024).toFixed(1)) + 'M，大小超过限制');
		}
		if(uploadTableVector.length > parseInt($('#max_all_file_length').attr('value'))){
			$('#upload-result-p').css({color: '#c7254e'});
			$('#upload-result-p').html('已选择' +
			String(uploadTableVector.length) + '个文件，总大小' +
			String((filesize / 1024 / 1024).toFixed(1)) + 'M，个数超过限制');
		}
		else{
			$('#upload-result-p').css({color : '#468847'});
			$('#upload-result-p').html('已选择' +
			String(uploadTableVector.length) + '个文件，总大小' +
			String((filesize / 1024 / 1024).toFixed(1)) + 'M');
		}
	}
	catch(err){}

	if(typeof(evt) == 'function'){
		evt();
	}

	$('.upload-select-td').mouseover(function(evt){
		$('#' + idDeal($(evt.target).attr('id'), 13) + '-div').show(0);
	});

	$('.upload-select-td').mouseout(function(evt){
		$('#' + idDeal($(evt.target).attr('id'), 13) + '-div').hide();
	});

	$('.upload-select-focus img').click(function(evt){
		var str = '';
		var i = 13;
		var id = $(evt.target).attr('id');
		while(id[i] != '-'){
			str += id[i];
			i++;
		}
		try{
			var x = parseInt(str);
		}
		catch(err){
			return;
		}

		uploadTableVector.splice(x, 1);
		$('.upload-select-td').fadeOut(100, function(){
			uploadTableShow();
		});
	});
}






$("#input-file").change(fileOnchange);

/*var fileIE;
$("#input-file-ie").change(function(){
	fileIE = document.getElementById("input-file-ie").files;
})*/

$("#upload-form").submit(function (evt) {
	if (uploadFiles(uploadTableVector)) {
        $("#uploading").fadeIn();
        $("#upload-submit-btn").fadeOut();
        $("#drag-logo").addClass('hover');
		FormDataClean();
	}
    evt.preventDefault();
});




















function selectTableshow(files){
	var str = '';
	for(var i = 0; i < files.length; ++i){
		file = files[i];
		str += '<tr id="select-tr-p' + String(i) + '" class="select-table-tr">';
		str += (
		'<td id="select-tr-p' + String(i) + '-td1" class="select-td-p1">' + file['id'] +
		'</td><td id="select-tr-p' + String(i) + '-td2" class="select-td-p2">' + file['name'] +
		'</td><td id="select-tr-p' + String(i) + '-td3" class="select-td-p3">' + file['filesizetext'] + '</td>'
		);
		str += '</tr>';
	}
	$('#select-table').html(str);
	$('.select-table-tr').click(function(evt){
		try{
			var id = parseInt($('#' + idDeal($(evt.target).attr('id'), 12) + '-td1').html());
		}
		catch(err){
			return;
		}
		selectNumLine(id);
		$('#select-btn-submit').focus();
		for(var i = 0; i < selectFileStore.length; ++i){
			if(!selectFileStore[i]){
				$('#select-all-on').show();
				$('#select-all-off').hide();
				return;
			}
		}
		$('#select-all-on').hide();
		$('#select-all-off').show();
	});
}


$("#download-form").submit(function (evt) {
	var tokens =$("#token-input").val().match(/\\-(\w+)\\-(\w+)/);
	if (tokens != null)
	{
		evt.preventDefault();
		var token_a = tokens[1];
		var token_b = tokens[2];

		$("#drag-box #drag-logo").css({"backgroundImage" : "url('-"+token_a+"')"});

		$("#drag-box #drag-logo").mouseenter(function () {
			$(this).css({"backgroundImage" : "url('-"+token_b+"')"});
		});

		$("#drag-box #drag-logo").mouseleave(function () {
			$(this).css({"backgroundImage" : "url('-"+token_a+"')"});
		});


	}else {
        evt.preventDefault();
        issec = $.ajax({url: baseURL + "item/issec/" + $("#token-input").val(), async: false});
        tx = issec.responseText;
		if(tx.length < 4){
			QuerySelectStatus = false;
		}
		else{
			QuerySelectStatus = (tx.substr(3, 1) == 'M');
		}
        if (tx.substr(0, 3) == 'YES') {
			QueryMess = $('#token-input').val();
			onHideDownload(onShowSecret);
        }
		else {
			if(QuerySelectStatus){
				QueryMess = $('#token-input').val();
				onHideDownload(function(){
					buildSelectUl();
					onShowSelect();
				});
				return;
			}
            $("#downloading").fadeIn();
            window.location = baseURL + "item/get/" + $("#token-input").val();
            setTimeout(function () {
                $('#downloading').fadeOut();
            }, 5000);
			FormDataClean();
        }
    }
});

$('#secret-form').submit(function(evt){
	evt.preventDefault();
	verify = $.ajax({url: baseURL + "item/verify/" + QueryMess + '/' + $('#sec-input').val(), async: false});
	tx = verify.responseText;
	if(tx == 'Y'){
		QueryPass = $('#sec-input').val();
		if(QuerySelectStatus){
			onHideSecret(function(){
				buildSelectUl();
				onShowSelect();
			});
		}
		else{
			$('#secret-label').css({color: '#468847'});
			$('#secret-label').html('验证码正确，即将进入下载...');
            window.location = baseURL + "item/get/" + QueryMess + '/' + QueryPass;
			onHideSecret(function(){
				onShowDownload(function(){
					$('#token-input').focus();
				})
			});
			FormDataClean();
		}
	}
	else{
		$('#secret-label').css({color: '#c7254e'});
		$('#secret-label').html('验证码错误，请重新输入');
		$('#sec-input').focus();
	}
});

$("#select-form").submit(function(evt){
	evt.preventDefault();
	var str = baseURL + 'item/get/' + QueryMess;
	if(QueryPass != '')str += ('/' + QueryPass);
	var selectOnArray = [];
	for(var i = 0; i < selectFileStore.length; ++i){
		if(selectFileStore[i]){
			selectOnArray.push(i);
		}
	}
	if(selectOnArray.length == 0){
		for(var i = 0; i < selectFileStore.length; ++i){
			selectOnArray.push(i);
		}
	}
	var form = $('#select-submit');
	form.attr('action', str);
	form.html('').append('<input type="text" name="download" value="1">');
	for(var x = 0; x < selectOnArray.length; ++x){
		form.append('<input type="text" name="file-select[]" value="' + selectOnArray[x] + '">');
	}
	form.submit();
	form.attr('action', '').html('');
	onHideSelect(function(){
		onShowDownload();
		$('#token-input').focus();
		FormDataClean();
	});
});

$('#upload-modal').on('hide', function (){
	uploadTableVector.splice(0, uploadTableVector.length);
});

$("#download-modal").on("hide", function () {
	$("#token-input").val("");
    $("#sec-input").val("");
	$("#downloading").hide();
});

$('#select-modal').on('hide', function(){
	$('#select-table').empty();
});

$("#upload-form-ie").submit(function (evt) {
    return true;
});

/* Drag & Drop support by Clarkok */
if (window.FileReader) {
	//$("#upload-drag-input").hide();
	$("#drag-box").on("dragover", function (_evt) {
		var evt = _evt.originalEvent;
		evt.stopPropagation();
		evt.preventDefault();
	}).on("drop", function (_evt) {
		var evt = _evt.originalEvent;
		evt.stopPropagation();
		evt.preventDefault();
		uploadFiles(evt.dataTransfer.files);
	});
}

function uploadFiles(files) {
	var xhr = null;
	try { // Abort if XML Http Request is not supported
		xhr = new XMLHttpRequest();
	} catch (error) {
		return false;
	}
	if (!files.length) {
		alert("没有检测到要上传的文件");
		return false;
	}
	var s="";
	for(var i=0;i<files.length;i++){
		s=s+(files[i].name)+"、";
	}
	var l=files.length;
	var singles=$('#max_single_file_size')[0].value;
	var alls=$('#max_all_file_size')[0].value;
	if(l>1){
		var allsize=0;
		for(i=0;i<l;i++){
			if(files[i].size > singles){
				alert(files[i].name+"太大了啦");
				return false;
			}
			allsize+=files[i].size;
			if(allsize>alls){
				alert("总大小太大了哦");
				return false;
			}
		}
	}else
    if (files[0].size > $('#max_file_size')[0].value){
        alert("文件太大了啦");
        return false;
    }

	var data = new FormData();
    data.append($("#upload_progress")[0].name,"qscbox");
	data.append("filecount",l);
	if(l>1){
		for(i=0;i<l;i++){
			data.append("file"+i,files[i]);
		}
	}else{
		data.append("file", files[0]);
	}
	data.append("callback", document.getElementById('callback').value);
	data.append("is_ie9", window.i_am_ie9);
	var progress = 0,
		redraw   = 0;
	$("#progress-outer").show(0);
	redraw = setInterval(function () {
		$("#progress-inner").css("width", progress * 100 + "%");
	}, 200);

	xhr.open($("#upload-form").attr("method"), $("#upload-form").attr("action"), true);
	xhr.addEventListener("load", function (evt) {

		var data = JSON.parse(xhr.responseText);
		if (!data) alert(xhr.responseText);
		handleUploadCallback(data);
		$("#progress-inner").css({"width" : "100%"});

		clearInterval(redraw);
	}, false);

	xhr.upload.addEventListener("progress", function (evt) {
		progress = evt.loaded / evt.total;
	}, false);

	xhr.send(data);

	return true;
}

function formAppear() {
	if (animating) { // In case of stocking of animation
		return;
	}
	animating = true;

	var btnID = this.id;
	if (handheld) {
		hide($("#btn-bar"));
	} else {
		$("#modal-cover").fadeTo(500, 0.9);
	}

	$("#modal-container").show(0, function (){
		if (btnID === "upload-btn") {
			$("#upload-modal").show(0, function () {
				$("#upload-modal").animate({marginTop : "48px"}, function () {
					animating = false;
				});
			});
		} else if (btnID === "download-btn") {
			$("#download-modal").show(0, function () {
				$("#download-modal").animate({marginTop : "48px"}, function () {
					animating = false;
					$('#token-input').focus();
				});
			});
		}
	});
}

function FormDataClean() {
	QueryPass = '';
	QueryMess = '';
	$('#token-input').val('');
	$('#sec-input').val('');
	$('#secret-label').html('');
	$('#upload-result-p').html('');
	uploadTableVector.splice(0, uploadTableVector.length);
	selectTableshow([]);
	uploadTableShow();
}

function formDisappear() {
	if (animating) { // In case of stocking of animation
		return;
	}
	animating = true;

	if (handheld) {
		$("#btn-bar").css("display","block");
        $("#btn-bar").height(200);
	}

	$(".modal").animate({marginTop : "-300px"}, function () {
		$(".modal").hide(0);
		$("#modal-container").hide(0);
		FormDataClean();
	});
	$("#modal-cover").fadeOut(function () {
		$("#modal-cover").hide(function () {
			animating = false;
			FormDataClean();
		});
	});
}


function hide(jQueryObject, time, func) {
	if (time === undefined) {
		time = 500;
	}
	jQueryObject.stop().animate({"height"         : "0",
		"padding-top"    : "0",
	"padding-bottom" : "0"}, time, function () {
		$(this).hide(0, func);
	});
}
function show(jQueryObject, time, func) {
	if (time === undefined) {
		time = 500;
	}
	jQueryObject.stop().show(0, function () {
		$(this).animate({"height"         : "60px",
			"padding-top"    : "8px",
		"padding-bottom" : "8px"}, time, func);
	});
}


