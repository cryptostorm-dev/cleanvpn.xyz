$(function() {
	var langsShow = false;
	var hash = null;
	var p = null;
	//var k = false;

	if ($('body.transparent-top').length) {
		$(window).scroll(function() {
			setNavMenu();
		});
		setNavMenu();
	}

	function setNavMenu() {
		top_ = $(this).scrollTop();

		if (top_ >= $('div.col.pic').offset().top - $('div.main-menu').outerHeight()) {
			$('body').removeClass('transparent-top');
		} else {
			$('body').addClass('transparent-top');
		}
	}

	$('#show-signin-button').click(function() {
		document.location.hash = '#signin';
	});

	$('#show-reminder-button').click(function() {
		document.location.hash = '#reminder';
	});

	$('#show-reminder-link').click(function() {
		$('#show-reminder-button').click();
	});

	$('#signin-password').bind('keypress', function(e) {
		if (e.keyCode == 13) {
			$('#signin-submit-button').click();
		}
	});

	/*$('#signup-email').bind('keypress', function(e) {
		if (e.keyCode == 13) {
			$('#signup-submit-button').click();
		}
	});*/

	$('#reminder-email').bind('keypress', function(e) {
		if (e.keyCode == 13) {
			$('#reminder-submit-button').click();
		}
	});

	$('#signin-submit-button').click(function(e) {
		email = $('#signin-email').val().trim();

		if (email.length == 0 || $('#signin-password').val().length == 0) {
			return;
		}

		$('#signin-error').hide();

		$.ajax({
		  	url: 'https://api.dotvpn.com/2/user/signin',
      		contentType: 'application/json',
		  	type: 'POST',
		  	data: JSON.stringify({
		  		email: email,
		  		passwd: $('#signin-password').val()
		  	}),
		  	dataType: 'json',
		  	success: function(data) {
		  		switch (data.code) {
		  			case 0:
		  				// success
		  				document.cookie = 'SID=' + encodeURIComponent(data.token) +
		  					'; path=/; domain=.dotvpn.com';

		  				document.location.href = document.location.origin +
		  					document.location.pathname.substring(0, 4) + 'plans';
		  				break;

		  			case 2:
		  				// invalid email/password
		  				$('#signin-error').show();
		  				break;
		  		}
			}
		});

		e.preventDefault();
	});

	$('#contact-submit-button').click(function(e) {
		email = $('#contact-email').val().trim();

		$.ajax({
		  	url: 'https://api.dotvpn.com/2/user/contact',
      		contentType: 'application/json',
		  	type: 'POST',
		  	data: JSON.stringify({
		  		email: $('#contact-email').val().trim(),
		  		text: $('#contact-message').val()
		  	}),
		  	dataType: 'json',
		  	success: function(data) {
		  		switch (data.code) {
		  			case 0:
		  				// success
		  				document.location.hash = '';
		  				break;
		  		}
			}
		});

		e.preventDefault();
	});

	$('#reminder-submit-button').click(function(e) {
		email = $('#reminder-email').val().trim();

		if (email.length == 0) {
			return;
		}
return;
		$.ajax({
			url: 'https://api.dotvpn.com/2/user/reminder',
			contentType: 'application/json',
			type: 'POST',
			data: JSON.stringify({
				email: email
			}),
			dataType: 'json',
			success: function(data) {
				switch (data.code) {
					case 0:
						// success
						$('#reminder-message').show();
						break;
				}
			}
		});

		e.preventDefault();
	});

	/*$('#first-name').keypress(function(e) {
    	var c = String.fromCharCode(e.which);

    	if (!c.match(/[A-Za-z\'\-\ ]/) || $(this).val().length > 26) {
    		e.preventDefault();
    	}
	});

	$('#first-name').blur(function(e) {
		if ($(this).val().length >= 2) {
			$(this).removeClass().addClass('valid');
			$(this).data('valid', 1);
		} else {
			$(this).removeClass().addClass('invalid');
			$(this).data('valid', 0);
		}
	});

	$('#last-name').keypress(function(e) {
    	var c = String.fromCharCode(e.which);

    	if (!c.match(/[A-Za-z\'\-\ ]/) || $(this).val().length > 26) {
    		e.preventDefault();
    	}
	});

	$('#last-name').blur(function(e) {
		if ($(this).val().length >= 2) {
			$(this).removeClass().addClass('valid');
			$(this).data('valid', 1);
		} else {
			$(this).removeClass().addClass('invalid');
			$(this).data('valid', 0);
		}
	});

	$('#email').keyup(function(e) {
		$(this).removeClass();
		$(this).data('valid', 0);

		if ($(this).val().length < 1) {	
			return;
		}
	});

	$('#email').blur(function(e) {
		if ($(this).val().length < 1) {
			return;
		}

		if (validateEmail($(this).val())) {
			$(this).removeClass().addClass('valid');
			$(this).data('valid', 1);
		} else {
			$(this).removeClass().addClass('invalid');
			$(this).data('valid', 0);
		}

		$('#email-confirm').trigger('blur');
	});

	$('#email-confirm').keyup(function(e) {
    	if (!$('#email').data('valid')) {
    		return;
    	}

    	var a = $('#email').val();
    	var b = $(this).val();

    	if (b.length >= a.length) {
    		if (a == b) {
    			$(this).removeClass().addClass('valid');
				$(this).data('valid', 1);
    		} else {
    			$(this).removeClass().addClass('invalid');
				$(this).data('valid', 0);
    		}
    	} else {
    		$(this).removeClass();
			$(this).data('valid', 0);
    	}
	});

	$('#email-confirm').blur(function(e) {
		if (!$('#email').data('valid') || $(this).val().length < 1) {
    		return;
    	}

    	var a = $('#email').val();
    	var b = $(this).val();

		if (a == b) {
			$(this).removeClass().addClass('valid');
			$(this).data('valid', 1);
		} else {
			$(this).removeClass().addClass('invalid');
			$(this).data('valid', 0);
		}

    	/*if ($(this).data('valid')) {
    		$(this).css('border', '1px solid green');
    	} else {
    		$(this).css('border', '1px solid red');
    	}*//*
	});

	$('#password').keyup(function(e) {
		$(this).removeClass();
		$(this).data('valid', 0);

		if ($(this).val().length < 1) {	
			return;
		}

		if ($(this).val().length >= 6) {
			$(this).data('valid', 1);
		} else {
			$(this).data('valid', 0);
		}
	});

	$('#password').blur(function(e) {
		if ($(this).val().length < 1) {
			return;
		}

		if ($(this).data('valid')) {
    		$(this).removeClass().addClass('valid');
    	} else {
    		$(this).removeClass().addClass('invalid');
    	}

    	$('#password-confirm').blur();
	});

	$('#password-confirm').keyup(function(e) {
    	if (!$('#password').data('valid')) {
    		return;
    	}

    	var a = $('#password').val();
    	var b = $(this).val();

    	if (b.length >= a.length) {
    		if (a == b) {
    			$(this).removeClass().addClass('valid');
				$(this).data('valid', 1);
    		} else {
    			$(this).removeClass().addClass('invalid');
				$(this).data('valid', 0);
    		}
    	} else {
    		$(this).removeClass();
			$(this).data('valid', 0);
    	}
	});

	$('#password-confirm').blur(function(e) {
		if (!$('#password').data('valid') || $(this).val().length < 1) {
    		return;
    	}

    	var a = $('#password').val();
    	var b = $(this).val();

		if (a == b) {
			$(this).removeClass().addClass('valid');
			$(this).data('valid', 1);
		} else {
			$(this).removeClass().addClass('invalid');
			$(this).data('valid', 0);
		}
	});*/

	/*$('#shadow').click(function() {
		//window.history.back(1);
		document.location.hash = '';
	});*/

	function validateEmail(email) { 
	    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	}

	function showPopup(id) {
		$('#shadow').show();
		$('#wrapper').hide();

		if (p != null) {
			$(p).hide();
		}

		p = id;
		$(id).css('display', 'block');
	}

	function hashMonitor() {
		if (window.location.hash != hash) {
			hash = window.location.hash;
			
			switch (hash) {
				case '#signin':
					showPopup('#signin-popup');
					$('#signin-email').focus();
					break;

				case '#signup':
				case '#reminder':
					showPopup(hash + '-popup');
					$(hash + '-email').focus();
					break;

				case '#contact':
					showPopup('#contact-popup');
					break;

				case '#gopro':
					showPopup('#gopro-popup');
					break;

				default:
					if (p != null) {
						$(p).hide();
						$('#wrapper').show();
						$('#shadow').hide();
					}
					break;
			}
		}

		setTimeout(hashMonitor, 400);
	}
	hashMonitor();

	/*$(".footer .languages .current a").click(function(e) {
		if(!langsShow) {
			$(".footer .languages li[class != 'current']").css("display", "inline-block");
		} else {
			$(".footer .languages li[class != 'current']").css("display", "none");
		}

		langsShow = !langsShow;

		e.preventDefault();
	});*/
});
