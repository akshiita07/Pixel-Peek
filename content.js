(async () => {
    // create a new canvas element:
    const canvas = document.createElement('canvas');
    canvas.id = 'eyedropperCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '9999999';
    canvas.style.cursor = 'crosshair';  //to show eyedropper like cursor over the canvas

    document.body.appendChild(canvas);

    // use a 2D context to draw image on this canvas:
    const context = canvas.getContext('2d', { willReadFrequently: true });

    // send message with "capture" message to the background.js script to capture the screenshot of the current tab:
    chrome.runtime.sendMessage({ action: 'capture' }, (response) => {
        // create an image object & add image to canvas:
        let img = new Image();
        img.src = response.screenshot;
        // When the image has loaded, draw it to the canvas
        img.onload = function () {
            // Resize canvas to match image size
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the image on canvas
            context.drawImage(img, 0, 0);
        };

        const colorHistory = [];

        canvas.addEventListener('click', function (e) {
            // caluculate position of mouse relative to canvas
            const x = e.offsetX;
            const y = e.offsetY;

            // use getImageData to retrive color of pixel at that mouse location
            const pixel = context.getImageData(x, y, 1, 1).data;
            // data array will contain rgb color values at that pixel
            const r = pixel[0];
            const g = pixel[1];
            const b = pixel[2];

            // use a fnc to convert rgb color code to hex color
            const hex = rgbToHex(r, g, b);

            function rgbToHex(r, g, b) {
                return "#" + [r, g, b].map(x =>
                    x.toString(16).padStart(2, '0')
                ).join('');
            }

            // print it in the div
            navigator.clipboard.writeText(hex).then(() => {
                alert(`RGB: (${r}, ${g}, ${b})\nHEX: ${hex} (copied to clipboard)`);
            });

            // Store the Color in History
            colorHistory.push(hex);
            console.log("Color History:", colorHistory);

            canvas.remove();
        });
    });

    // Listen for the "stop" message to remove the canvas
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === 'stop') {
            const canvas = document.getElementById('eyedropperCanvas');
            if (canvas) {
                canvas.remove();
                sendResponse({ success: true, message: "PixelPeek stopped successfully." });
            } else {
                sendResponse({ success: false, message: "No canvas found to remove." });
            }
        }
    });
})();