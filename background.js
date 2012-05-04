var enabled = false;

var listenIntently = function(details) {
  if (details.requestHeaders === undefined) {
    details.requestHeaders = {};
  }
  //details.requestHeaders['X-Forwarded-For'] = '12.13.14.15';
  details.requestHeaders.push({
    'name': 'X-Forwarded-For',
    'value': '12.13.14.15'
  });
  return {requestHeaders: details.requestHeaders};
};

chrome.browserAction.onClicked.addListener(function(){
  if (enabled) {
    enabled = false;
    chrome.browserAction.setIcon({path:"icon-off.png"});
    chrome.webRequest.onBeforeSendHeaders.removeListener(listenIntently);
  } else {
    enabled = true;
    chrome.browserAction.setIcon({path:"icon-on.png"});
    chrome.webRequest.onBeforeSendHeaders.addListener(
      listenIntently,
      {"urls": [
        'http://*/*'
      ]},
      ["blocking", "requestHeaders"]
    );
  }
});

