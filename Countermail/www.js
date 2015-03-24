
function RATE(id_num,size){
	var id=id_num;
	if (!size){size='';}
	var ftype=1;
	var prot = window.location.protocol.toLowerCase()+"//";
	var server = "trustlogo.comodo.com/usertrust";
	var url_clear = prot + server + "/images/1x1_clear.gif";
	var url_logo = prot+server+"/fb_view_logo?type="+ftype;
	var url_win = prot+server+"/fb_mouse_click?type="+ftype;
	var host=location.host;
	document.write('<a href="'+prot+host+'" onClick=\'window.open("'+url_win+'&id='+id+'","'+id+'","width=450,height=634,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,copyhistory=no,resizable=no");return false;\'><img src="https://countermail.com/images/usertrust.gif" style="border:none;" alt="Feedback Logo"></a>');
}
