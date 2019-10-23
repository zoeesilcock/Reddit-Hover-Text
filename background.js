function onRequest(request, sender, callback) {
  switch(request.action) {
    case 'addUrlToHistory':
      chrome.history.addUrl({url: request.url});
      break;
  }
}

function onMessage(request, sender, sendResponse) {
  if (request.contentScriptQuery == 'fetchPostText') {
    $.ajax({
      url: 'https://old.reddit.com/api/expando',
      type: 'POST',
      data: { link_id: request.linkId },
      success: function(data) {
        sendResponse(data);
      }
    }).fail(function() {
      sendResponse(false);
    });

    return true;
  }
}

$(document).ready(function() {
  chrome.extension.onRequest.addListener(onRequest);
  chrome.runtime.onMessage.addListener(onMessage);
});
