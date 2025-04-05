// first load html:
document.addEventListener('DOMContentLoaded', () => {
    // when the start button is clicked:
    document.getElementById('start').addEventListener('click', () => {
        // get info about current active tab:
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            // to inject and execute a content.js into the active tab:
            if (!tabs || tabs.length === 0) {
                console.error("No active tab found.");
                return;
            }

            const activeTab = tabs[0];
            const url = activeTab.url;

            // Check if the URL is valid (not a chrome:// or restricted page)
            if (!url || url.startsWith('chrome://') || url.startsWith('chrome-extension://')) {
                alert("PixelPeek cannot be used on this page.");
                return;
            }

            // Inject and execute content.js into the active tab
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                files: ['content.js']
            }, () => {
                if (chrome.runtime.lastError) {
                    console.error("Error executing script:", chrome.runtime.lastError.message);
                }
            });
        });
    });

    // Stop PixelPeek
    document.getElementById('stop').addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (!tabs || tabs.length === 0) {
                console.error("No active tab found.");
                return;
            }

            const activeTab = tabs[0];

            // Send a message to the content script to stop PixelPeek
            chrome.tabs.sendMessage(activeTab.id, { action: 'stop' }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error("Error sending stop message:", chrome.runtime.lastError.message);
                } else {
                    console.log("PixelPeek stopped:", response);
                }
            });
        });
    });
});