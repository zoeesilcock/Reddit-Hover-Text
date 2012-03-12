function onRequest(request, sender, callback) {
  switch(request.action) {
    case 'addUrlToHistory':
      chrome.history.addUrl({url: request.url});
      break;
  }
};

$(document).ready(function() {
  chrome.extension.onRequest.addListener(onRequest);
});
