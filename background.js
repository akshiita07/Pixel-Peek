// background script listens for messages sent to extension
// message:sent by sender
// sender: information about sender of msg
// sendResponse: function to send response back to sender
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'capture') {
        // capture a screenshot of the currently visible tab
        chrome.tabs.captureVisibleTab(null, { format: 'png' }, function (screenshotUrl) {
            // send this screeenshot url as a response
            sendResponse({ screenshot: screenshotUrl });
        });
        return true;
    }
});