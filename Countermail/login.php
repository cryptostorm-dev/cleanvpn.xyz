









                       <script>
<!--
  var alreadyFocused = false;
  function squirrelmail_loginpage_onload() {
    if (alreadyFocused) return;
    var textElements = 0; var i = 0;
    for (i = 0; i < document.login_form.elements.length; i++) {
      if (document.login_form.elements[i].type == "text" || document.login_form.elements[i].type == "password") {
        textElements++;
        if (textElements == 1) {
          document.login_form.elements[i].focus();
          break;
        }
      }
    }
  }
// -->
</script>




























                         <script>
		var topurl=""+top.window.location.href;
   	if (topurl.indexOf("ttps://countermail.com/webmail.php")<1) top.window.location.href="https://countermail.com/webmail.php?r=t";

		var errorStr = null;
		function isWin8Metro() 
		{
		  errorStr = null;
        var detected = null; 
        try 
		  {
            new ActiveXObject('');
        }
        catch (e)
		  {
            //FF
            errorStr = e.name; 
        }     
        try 
		  {
            detected = !new ActiveXObject('htmlfile');
        }
		  catch (e)
		  {
            detected = true;
        }
        if (detected == true && errorStr != 'ReferenceError') detected = true;
        else detected = false;
        return detected;
		}	
		
	function InitAll()
	{
		try 
		{
			top.JavaCheckCnt=0;
      }
		catch (e)
		{
			window.setTimeout("InitAll()",250);
			return;
		}
		if (isWin8Metro())
		{
			document.getElementById('logintext').innerHTML='<h3>Java failed - <font color="#FF0000">Please read below!</font></h3>You are using Windows 8 in Metro mode, you must switch to Desktop mode:<br><br>Press the Windows Key + T on your keyboard<br>Then start Internet Explorer (or another web browser).';
		}
		else top.CheckReason();
	}
	</script>
