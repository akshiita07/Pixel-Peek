window.addEventListener('DOMContentLoaded', function () {
    // Extract canvas using its id
    var canvas = document.getElementById('myCanvas');
    // expecting a 2D context:
    var context = canvas.getContext('2d');
    // add image to canvas:
    var image = new Image();
    image.src = "logo.png";

    // When the image has loaded, draw it to the canvas
    image.onload = function () {
        // Resize canvas to match image size
        canvas.width = image.width;
        canvas.height = image.height;

        // Draw the image on canvas
        context.drawImage(image, 0, 0);
    };

    // get pixel color on moving over canvas
    canvas.addEventListener('mousemove', function (e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const pixel = context.getImageData(x, y, 1, 1).data;
        const r = pixel[0];
        const g = pixel[1];
        const b = pixel[2];

        const hex = rgbToHex(r, g, b);

        showColor.innerHTML = `RGB: (${r}, ${g}, ${b}) <br> HEX: ${hex}`;
        showColor.style.backgroundColor = hex;
    });

    function rgbToHex(r, g, b) {
        return "#" + [r, g, b].map(x =>
            x.toString(16).padStart(2, '0')
        ).join('');
    }
});