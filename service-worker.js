async function fetchPostContent(request) {
  const formData = new FormData();
  formData.append('link_id', request.linkId);

  const response = await fetch('https://old.reddit.com/api/expando', {
    method: 'POST',
    body: formData,
  });

  const postContent = await response.text();
  return postContent;
}

const onMessage = (request, sender, sendResponse) => {
  console.log(request);
  if (request.action == 'addUrlToHistory') {
    chrome.history.addUrl({url: request.url});
    return true;
  } else if (request.contentScriptQuery == 'fetchPostText') {
    fetchPostContent(request).then(sendResponse);
    return true;
  }
}

chrome.runtime.onMessage.addListener(onMessage);
