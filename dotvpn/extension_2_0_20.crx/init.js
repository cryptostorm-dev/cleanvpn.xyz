var proxy = new ProxyController();
var lastConnectTime = 0;
var lastReconnectTime = 0;
var connectDelay = 1000;
var iconNumber = 1;
var iconTimer;
var apiHost = 'https://apache-iv.com';

var browser = new RegExp('OPR/')
	.test(navigator.userAgent)
	? 'opr' : 'crm';

init(function() {
	if (settings.autoStart) {
		enableProxy();
	}
});

window.setInterval(function() {
	if (settings.token == null) {
		return;
	}

	updateUserInfo();
}, 5 * 60 * 1000);

window.setInterval(checkNotifications, 5 * 60 * 1000);

function checkNotifications() {
	if (settings.token != null) {
		$.ajax({
			url: apiHost + '/2/user/notification',
			contentType: 'application/json',
			type: 'POST',
			data: JSON.stringify({
				token: settings.token
			}),
			dataType: 'json',
			success: function(data) {
				if (data.event && data.event != settings.event) {
					settings.event = data.event;
					settings.eventView = false;
				}
			},
			complete: function(xhr) {
				sendFailMetric(xhr);
			}
		});
	}
}

function getUnixtime() {
	return Math.round((new Date()).getTime() / 1000);
}

function init(callback) {
	if (settings.token == null) {
		return;
	}
	proxy.init(settings.email, settings.token);

	settings.enabled = false;
	//updateUserInfo(callback);

	if (callback) {
		callback();
	}
}

function updateUserInfo(callback) {
	$.ajax({
		url: apiHost + '/2/user/info',
		contentType: 'application/json',
		type: 'POST',
		data: JSON.stringify({
			token: settings.token,
			udid: settings.udid,
			type: browser,
			version: chrome.app.getDetails().version,
		}),
		dataType: 'json',
		success: function(data) {
			settings.bwGroup = data.bwGroup;
			settings.name = data.name;
			settings.premium = !!data.premium;

			if (callback) {
				callback();
			}
		},
		complete: function(xhr) {
			sendFailMetric(xhr);
		}
	});

	if (settings.udid != null) {
		return;
	}

	$.ajax({
		url: apiHost + '/2/user/create-udid',
		contentType: 'application/json',
		type: 'POST',
		data: JSON.stringify({
			token: settings.token
		}),
		dataType: 'json',
		success: function(data) {
			if (data.code == 0) {
				settings.udid = data.udid;
			}
		},
		complete: function(xhr) {
			sendFailMetric(xhr);
		}
	});
}

function sendMetric(type, metadata) {
  $.ajax({
    url: 'https://api.apohola.com/2/user/metric',
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify({
      token: settings.token,
      type: type,
      metadata: metadata
    }),
    dataType: 'json'
  });
}

function sendFailMetric(xhr) {
	if (xhr.statusText != 'OK') {
		sendMetric(3, {
			status: xhr.statusText,
			statusCode: xhr.status
		});
	}
}

function getNode(callback) {
	$.ajax({
      url: apiHost + '/2/user/get-node',
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify({
        token: settings.token,
        location: settings.location,
        udid: settings.udid
      }),
      dataType: 'json',
      success: function(data) {
      	settings.node = data.node;
      },
      complete: function(xhr) {
      	callback();
      	sendFailMetric(xhr);
      }
  	});
}

function enableProxy(updateSettings, callback) {
	if (updateSettings) {
		getNode(function() {
			proxy.setProxyEnabled(true);
			enableProxy_(callback);	
		});
	} else {
		enableProxy_(callback);	
	}
}

function enableProxy_(callback) {
	settings.enabled = true;
	lastConnectTime = getUnixtime();

	startIconAnimation('y');
	setTimeout(function() {
		if (settings.enabled) {
			stopIconAnimation();
			startIconAnimation('g');
		}
	}, connectDelay);

	chrome.browserAction.setTitle(
		{ title: chrome.i18n.getMessage('connected') });

	chrome.webRequest.onErrorOccurred.addListener(
		requestErrorHandler, {urls: ['<all_urls>']});

	if (callback) {
		callback();
	}
}

function disableProxy(callback) {
	proxy.setProxyEnabled(false);
	settings.enabled = false;

	stopIconAnimation();
	setNextIcon('r');

    chrome.browserAction.setTitle(
    	{ title: chrome.i18n.getMessage('disconnected') });

	chrome.webRequest.onErrorOccurred.removeListener(
		requestErrorHandler);

    if (callback) {
		callback();
    }
}

function startIconAnimation(state) {
	clearInterval(iconTimer);

	iconTimer = setInterval(function() {
		setNextIcon(state);
	}, 200);
}

function stopIconAnimation() {
	clearInterval(iconTimer);
}

function setNextIcon(state) {
	if (iconNumber == 41) {
		iconNumber = 1;
	}

	chrome.browserAction.setIcon(
		{ path: {	'19': '/i/icons/19/' + state + iconNumber + '.png',
					'38': '/i/icons/38/' + state + iconNumber + '.png' } });

	iconNumber++;
}

function requestErrorHandler(data) {
	//console.log(data);

	switch (data.error) {
		case 'net::ERR_PROXY_CERTIFICATE_INVALID':
		//case 'net::ERR_PROXY_CONNECTION_FAILED':
		//case 'net::ERR_TUNNEL_CONNECTION_FAILED':
			if (lastReconnectTime == 0) {
				lastReconnectTime = getUnixtime();
				disableProxy();
				enableProxy(true);
				//console.log('reconnect');
			}
			break;
	}
}
